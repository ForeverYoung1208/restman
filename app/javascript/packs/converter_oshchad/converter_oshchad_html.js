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
    const parser = new DOMParser();

    return parser.parseFromString(rawData, 'text/html')
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