import XLSX from "js-xlsx";
import Moment from "moment"


var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer

function getJsDateFromExcel(excelDate) {
  return new Moment((excelDate - (25567 + 2))*86400*1000);
}

function toDecimal(v) {
  return Math.round(parseFloat( v.toString().replace(/,/, '.').replace(/\s/g, "") )*100) /100
}

function toDecimalOut(v) {
  return v.toFixed(2).replace(/\./, ',')
}

function redIf( compare ){
  let a = compare
  // console.log( a )
  if ( compare() ){
    return 'class="alert alert-danger"'
  }
  
}



class Movement extends Object{
  constructor(cells, baseCellName){
    super();
    let baseCellRow = parseInt( baseCellName.slice(2) )
    let recipientCellName = 'K' + (baseCellRow + 2)  ;
    let okpoCellName = 'AK' + (baseCellRow + 2);
    let numberCellName = 'L' + baseCellRow;
    let infoCellName = 'J' + (baseCellRow + 3);
    let dateCellName = 'AM' + (baseCellRow + 1);
    let date = getJsDateFromExcel( cells[dateCellName].v )

    this.data = {
      addr: baseCellName,
      number: cells[numberCellName].v ? cells[numberCellName].v : 'None',
      sum: toDecimal(cells[baseCellName].v),
      agent: cells[recipientCellName] ? cells[recipientCellName].v : 'None',
      agentEdrpou: cells[okpoCellName] ? cells[okpoCellName].v.slice(5) : 'None',
      info: cells[infoCellName] ? cells[infoCellName].v : 'None',
      date: date.format("DD.MM.YYYY")
    }
  }
}


class  Movements extends Object{
  constructor(oschadStruct){
    super();
    this.balanceParams = {
      markerColumn: 'E',
      inBalanceColumn: 'AG',
      outBalanceColumn: 'AF',
      creditTotalColumn: 'S',
      debitTotalColumn: 'AD',
      dateBeginColumn:'N',
      dateEndColumn: 'E',
      totalMarker10: 'Всього обо',
      inBalanceMarker10: 'Вхiдний за',
      outBalanceMarker10: 'Вихiдний з',
    } 

    this.creditColumn = 'AA';
    this.debitColumn = 'AJ';
    
    this.creditTotal = 0;
    this.debitTotal = 0;
    this.creditTotalBM = 0;
    this.debitTotalBM = 0;
    this.inBalance = 0;
    this.outBalance = 0;
    this.dateBegin = '';
    this.dateEnd = '';


    this.allCredit = this.getMovFromOschad(oschadStruct, this.creditColumn, 'creditTotalBM');
    this.allDebit = this.getMovFromOschad(oschadStruct, this.debitColumn, 'debitTotalBM');
    this.getBalFromOschad(oschadStruct, this.balanceParams)
  }

  getBalFromOschad =(w, params) =>{
    let {markerColumn, 
      outBalanceColumn, 
      creditTotalColumn,
      debitTotalColumn,
      inBalanceColumn, 
      totalMarker10, 
      inBalanceMarker10, 
      dateBeginColumn,
      dateEndColumn,      
      outBalanceMarker10} = params

    const cells = w.Sheets[ w.SheetNames[0] ];
    const res = new Array;

    for( let cellName in cells ){
      if (cellName.slice(0,1) == markerColumn) {

        if (cells[cellName].v.slice(0, 10) == inBalanceMarker10){
          const inBalanceRow = parseInt( cellName.slice(1) )+1          
          const dateBeginRow = inBalanceRow-1
          if (this.inBalance == 0) { 
            this.inBalance = cells[inBalanceColumn+inBalanceRow].v 
            console.log( this.inBalance )    

          }
          this.dateBegin == '' ? this.dateBegin = getJsDateFromExcel(cells[dateBeginColumn+dateBeginRow].v).format("DD.MM.YYYY") : null
        } 
        else if (cells[cellName].v.slice(0, 10) == outBalanceMarker10){
          const outBalanceRow = parseInt( cellName.slice(1) )+0
          const dateEndRow = outBalanceRow-0
          this.outBalance = cells[outBalanceColumn+outBalanceRow].v
          this.dateEnd = cells[dateEndColumn+dateEndRow].v.substring(27)
        }
        else if (cells[cellName].v.slice(0, 10) == totalMarker10){
          const totalRow = parseInt( cellName.slice(1) )+1
          
          this.creditTotal = toDecimal( cells[creditTotalColumn + totalRow].v )
          this.debitTotal = toDecimal( cells[debitTotalColumn + totalRow].v )

        }


      }
    }
    

  }


  getMovFromOschad = (w, valueColumn, totalPropName) => {
    const cells = w.Sheets[ w.SheetNames[0] ];
    const res = new Array;

    for( let cellName in cells ){

      if (cellName.slice(0,2) == valueColumn) {
        let cellVal = toDecimal(cells[cellName].v)

        if (!isNaN(cellVal)) {
          let movement = new Movement(cells, cellName) 
          res.push(movement)
          this[totalPropName] = Math.round( (this[totalPropName] + movement.data.sum)*100) / 100
        }
      }
    }
    return res;
  }

  drawTo = (jqET) => {
    jqET.html('')
    jqET.append('<thead></thead>')
      .find('thead')
      .append('<th>номер</th>')
      .append('<th>дата</th>')
      .append('<th>приход UAH</th>')
      .append('<th>приход USD</th>')
      .append('<th>расход UAH</th>')
      .append('<th>расход USD</th>')
      .append('<th>контрагент</th>')
      .append('<th>назначение</th>')

    const jqBody = jqET.append('<tbody></tbody>').find('tbody')

    jqBody.append('<tr></tr>').find('tr').last()
      .append( "<td colspan = 8 > на "+ this.dateBegin 
        +" вх. залишок: " + toDecimalOut(this.inBalance) +" грн. </td>")
      

    this.allCredit.forEach( (ac) =>{
      jqBody.append('<tr></tr>').find('tr').last()
        .append('<td>'+ac.data.number+'</td>')
        .append('<td>'+ac.data.date+'</td>')
        .append('<td class="money"> 0,00 </td>')
        .append('<td class="money"> 0,00 </td>')
        .append('<td class="money">'+toDecimalOut(ac.data.sum)+ '</td>')
        .append('<td class="money"> 0,00 </td>')
        .append('<td>'+ac.data.agent+'</td>')
        .append('<td>'+ac.data.info+'</td>')
    })

    this.allDebit.forEach( (ad) =>{
      jqBody.append('<tr></tr>').find('tr').last()
        .append('<td>'+ad.data.number+'</td>')
        .append('<td>'+ad.data.date+'</td>')
        .append('<td class="money">'+toDecimalOut(ad.data.sum)+ '</td>')
        .append('<td class="money"> 0,00 </td>')
        .append('<td class="money"> 0,00 </td>')
        .append('<td class="money"> 0,00 </td>')
        .append('<td>'+ad.data.agent+'</td>')
        .append('<td>'+ad.data.info+'</td>')
    })

    jqBody.append('<tr></tr>').find('tr').last()
      .append( "<td colspan=8 "
        +redIf( ()=>toDecimalOut(this.debitTotalBM)!=toDecimalOut(this.debitTotal)  )
        +"> оборотів по ДТ "+ toDecimalOut(this.debitTotalBM)
        +" оборотів по КТ " + toDecimalOut(this.creditTotalBM) +" грн. (по знайдених платежах)</td>")

    jqBody.append('<tr></tr>').find('tr').last()
      .append( "<td colspan=8 "
        +redIf( ()=>toDecimalOut(this.debitTotalBM)!=toDecimalOut(this.debitTotal)  )
        +"> оборотів по ДТ "+ toDecimalOut(this.debitTotal)
        +" оборотів по КТ " + toDecimalOut(this.creditTotal) +" грн. (по виписці з банку)</td>")      


    jqBody.append('<tr></tr>').find('tr').last()
      .append( "<td colspan=8 > на "+ this.dateEnd
        +" вих. залишок: " + toDecimalOut(this.outBalance) +" грн. </td>")


  }
}


var reader = new FileReader();
reader.doDraw = true;
reader.onload = function(e) {
  var data = e.target.result;
  if(!rABS) data = new Uint8Array(data);
  var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});

  /* DO SOMETHING WITH workbook HERE */    
  const movements = new Movements( workbook )
  const jqElementTable = $('table#result')

  this.doDraw ? movements.drawTo(jqElementTable) : console.log({'doDraw-is-false':this})

};

/////////////// TODO implement this!
export const readOshchad = (files) =>{
  const _reader = new FileReader();
  let _files = files, _f = _files[0];
  if(rABS) _reader.readAsBinaryString(_f); else _reader.readAsArrayBuffer(_f);  
  return new Promise ( (resolve,reject) => {
    _reader.onload = (e) =>{
      let _data = e.target.result;
      if(!rABS) _data = new Uint8Array(data);
      let _workbook = XLSX.read(_data, {type: rABS ? 'binary' : 'array'});
      const _movements = new Movements( _workbook )
      resolve(_movements)
    }
    _reader.onerror = (e)=>{
      _reader.abort();
      reject({'error_opening_file':e});
    }
  })

};





export function handleDrop(e) {
	e.stopPropagation(); e.preventDefault();
  var files = e.dataTransfer.files, f = files[0];
  if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
}

export function handleDragover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
}

export function handleFile(e) {
  var files = e.target.files, f = files[0];
  if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
}

document.onreadystatechange = () => {

  if (document.readyState === "interactive") {

		const drop = document.getElementById('drop-area')
		drop.addEventListener('dragenter', handleDragover, false);
		drop.addEventListener('dragover', handleDragover, false);
		drop.addEventListener('drop', handleDrop, false);

		 
		const xlf = document.getElementById('xlf');
		xlf.addEventListener('change', handleFile, false);

  	console.log('converter ready')

  }
}