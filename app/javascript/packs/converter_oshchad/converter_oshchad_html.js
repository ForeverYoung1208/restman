import Moment from "moment"
import { Children } from "react";

class Movement extends Object{
  constructor(cells, baseCellName){
    super();
    this.data = {
      account:'',
      transactionDate:'',
      detail:'',
      netValue:0,
      feeValue:0,
      totalValue:0,
      date2:''
    }
  }
  composedDetail(){
    return this.transactionDate + this.detail
  }
}


class  Movements extends Object{
  constructor(rawData){
    super();
    this.data = {
      startDate:'',
      endDate:'',
      startValue: 0,
      endValue: 0,
      movements:[],
    }

    this.rawData = rawData
    this.elements = this.parseToElements(this.rawData);
    console.log('[this.elements]', this.elements);
  }

  parseToElements = (rawData) => {
    return DOMParser(rawData, 'text/html')
  }

  // validateEndValue(){}
  // drawTo(outputElement){ }
}




var reader = new FileReader();
// reader.doDraw = true;
reader.onload = function(e) {
  var data = e.target.result;
  const movements = new Movements(data)


  
  // this.doDraw ? movements.drawTo(jqElementTable) : console.log({'doDraw-is-false':this})

};

function handleDragover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
}

function handleDrop(e) {
  e.stopPropagation(); e.preventDefault();
  e.dataTransfer.dropEffect = 'copy'
  const f = e.dataTransfer.files[0]
  reader.readAsBinaryString(f)
  console.log('[f]', f);
}

function handleFile(e) {
  const f = e.target.files[0];
  reader.readAsBinaryString(f)
}

document.onreadystatechange = () => {

  if (document.readyState === "interactive") {

    debugger
		const drop = document.getElementById('drop-area')
		drop.addEventListener('dragover', handleDragover, false);
		drop.addEventListener('drop', handleDrop, false);
		 
		const htmlFileElement = document.getElementById('htf');
		htmlFileElement.addEventListener('change', handleFile, false);

  	console.log('converter ready')

  }
}