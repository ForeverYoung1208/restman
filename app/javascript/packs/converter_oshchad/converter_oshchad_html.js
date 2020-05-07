import Moment from "moment"
import { Children } from "react";


function getDigitalValue(str){
  return parseFloat( str.innerText.replace(/\s/g,"") )  
}
 
// movement = {
//   accountNumber:'',
//   date:'',
//   detail:'',
//   currency:'',
//   netValue:0,
//   feeValue:0,
//   totalValue:0,
//   date:''
// ]

class  Movements extends Object{
  constructor(rawData){
    super();
    this.data = {
      startDate:'',
      endDate:'',
      startValue: 0,
      endValue: 0,
      movements:[]
    }

    this.rawData = rawData
    this.AllElements = this.parseToElements(this.rawData);
    this.data = this.findDataInElements(this.AllElements);
    console.log('data ready: [this.data]', this.data);
  }


  validateEndValue = ()=> {
    //..
  }
  
  drawTo = (outputElement) => {
    const table = document.createElement('table')
    table.classList.add('results--table')
    table.innerHTML = `
      <tr>

        <th> accountNumber</th>
        <th> date</th>
        <th> detail</th>
        <th> currency</th>
        <th> netValue</th>
        <th> feeValue</th>
        <th> totalValue</th>
        <th> date </th>
      </tr>
    `
    let movementStr;
    this.data.movements.forEach( m =>{
      movementStr = document.createElement('tr')
      movementStr.innerHTML = `
        <td> ${m.accountNumber}</td>
        <td> ${m.date}</td>
        <td> ${m.detail}</td>
        <td> ${m.currency}</td>
        <td> ${m.netValue}</td>
        <td> ${m.feeValue}</td>
        <td> ${m.totalValue}</td>
        <td> ${m.date }</td>
      `
      table.appendChild(movementStr)
    })


    outputElement.appendChild(table)
  }

  private

  findDataInElements = (elements) => {
    const ttElements =  elements.querySelectorAll('tt');
    const foundData = {
      startDate:'',
      endDate:'',
      startValue: 0,
      endValue: 0,
      movements:[], 
    };
    let currentAccountNumber; //last found account number
    let lastMovInData; //pointer to current last found movement at current iteration

    ttElements.forEach((tt, i)=>{
      //startDate, endDate
      if (/Період.*/i.test(tt.innerText)){
        foundData.startDate = ttElements[i+1].innerText.replace(/\//g, ".");
        foundData.endDate = ttElements[i+3].innerText.replace(/\//g, ".");
      }

      //startValue
      if (/Початковий\sбаланс/i.test(tt.innerText)){
        foundData.startValue = getDigitalValue(ttElements[i+2]);
      }

      //we've found a start of new movement section (found new account declartation)
      if (/Транзакції\sпо.*/i.test(tt.innerText)){
        currentAccountNumber = ttElements[i+1].innerText.trim() ;
      }
      
      if (/\d\d\/\d\d\/\d\d\s\d\d:\d\d/.test(tt.innerText)){
        //we've found new transactionDate - i.e. a new movement
        foundData.movements.push({})
        lastMovInData = foundData.movements[ foundData.movements.length - 1]
        lastMovInData.accountNumber = currentAccountNumber

        //save raw transaction date as satrting part of movement's detail
        lastMovInData.detail = tt.innerText + ' '
        
        //other data...
        lastMovInData.detail += ttElements[i+1].innerText;
        lastMovInData.netValue = getDigitalValue(ttElements[i+2]);
        lastMovInData.currency = ttElements[i+3].innerText;
        
        // parse date
        lastMovInData.date = ttElements[i+4].innerText.slice(0,9).replace(/\//g, ".");
        //insert century
        lastMovInData.date = lastMovInData.date.slice(0,6) + '20' + lastMovInData.date.slice(6,8)
        
        //other data...
        lastMovInData.feeValue = getDigitalValue(ttElements[i+5]);
        lastMovInData.totalValue = getDigitalValue(ttElements[i+6]);

      }

    })
    return foundData
  }

  parseToElements = (rawData) => {
    const parser = new DOMParser();
    return parser.parseFromString(rawData, 'text/html')
  }

} //end Movements


var reader = new FileReader();

reader.onload = function(e) {
  var data = e.target.result;
  const movements = new Movements(data)
 
  movements.drawTo( document.getElementById('results'))

};

function handleDragover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
}

function setParsedFileName(fileName) {
  document.querySelector('.fileName')
  
}

function handleDrop(e) {
  e.stopPropagation(); e.preventDefault();
  e.dataTransfer.dropEffect = 'copy'
  const f = e.dataTransfer.files[0]
  reader.readAsText(f)
  setParsedFileName(f.name)
}

function handleFile(e) {
  // console.log('[e]', e);
  const f = e.target.files[0];
  // console.log('[f]', f);
  reader.readAsText(f)
  e.target.value='';
  setParsedFileName(f.name)
  
}

document.onreadystatechange = () => {

  if (document.readyState === "interactive") {

		const drop = document.getElementById('drop-area')
		drop.addEventListener('dragover', handleDragover, false);
		drop.addEventListener('drop', handleDrop, false);
		 
		const htmlFileElement = document.getElementById('htf');
		htmlFileElement.addEventListener('change', handleFile, false);

  	console.log('converter ready')

  }
}