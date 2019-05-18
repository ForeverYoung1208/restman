import React from 'react'
import { Button } from 'reactstrap'
// import XLSX from "js-xlsx";
// import XlsxPopulate  from 'xlsx-populate'


import Moment from "moment"
import ReactFileReader from "react-file-reader"
import { saveAs } from'file-saver'




/////////////////////////////////////// it works but loses styles ////////////////////////////
// function s2ab(s) { 
//                 let buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
//                 let view = new Uint8Array(buf);  //create uint8array as viewer
//                 for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
//                 return buf;    
// }
// function handleExportToXls(files){
//   const _reader = new FileReader();
//   let _f = files[0];	
//   _reader.readAsBinaryString(_f)

//   _reader.onload = (e) =>{
//     let _data = e.target.result;
//     let _workbook = XLSX.read(_data, {type:'binary'});
// 		console.log( _workbook )

// 		let wbout = XLSX.write(_workbook,{ bookType:'xlsx', bookSST:false, type:'binary' })
// 		saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream;charset=windows-1251"}), "test.xlsx");

//   }

// }
////////////////////////////////////////////////


////////////////IT WORKS but there are easyest way to manage substitution!!!
// function handleExportToXls(files){
// 	XlsxPopulate.fromDataAsync(files[0])
//   .then(function (workbook){
//   	workbook.outputAsync().then((blob)=>{
//   		saveAs(blob, "test.xlsx");
//   	})
//   })
// };
////////////////IT WORKS!!!


///////////////////////////////////// V2 /////////////////////////////////////////////////////////
let XlsxTemplate = require('xlsx-template');

function handleExportToXls(fileTemplate,movements,date,companyGroupName){
	console.log(movements)
  const _reader = new FileReader();
  _reader.readAsBinaryString(fileTemplate)
  _reader.onload = (e) =>{
      let template = new XlsxTemplate(e.target.result);
      // Replacements take place on first sheet
      let sheetNumber = 1;
      // Set up some placeholder values matching the placeholders in the template
      let values = {
              date: date,
              group: companyGroupName,
              // company_id0: movements[0].company_id,
              // company_id1: movements[1].company_id,
          };
      movements.forEach((m,index)=>{
        values['company_id'+index]=m.company_id

      })

      // Perform substitution
      template.substitute(sheetNumber, values);
      // Get binary data
      let data = template.generate({type: 'blob'});
      saveAs(data, "test.xlsx");
  }
}
/////////////////////////////////////

export default function ExpotToXls(props){
	const {movements, date,companyGroupName} = props
	const exportButton =
							<ReactFileReader fileTypes={[".xls",".xlsx"]} handleFiles={(files)=>handleExportToXls(files[0],movements, date,companyGroupName)}>
								<Button type="button" className="btn btn-warning">
								<span className="fa fa-download p-1"></span>
									Експорт (обрати шаблон)
								</Button>	
							</ReactFileReader>

	return(
		<section>
			{(movements&& movements.length>0) ? exportButton
				: <Button className="btn btn-light" disabled>No movements</Button>
			}
		</section>
	)
}