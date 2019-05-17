import React from 'react'
import { Button } from 'reactstrap'
import XLSX from "js-xlsx";
import XlsxPopulate  from 'xlsx-populate'
import Moment from "moment"
import ReactFileReader from "react-file-reader"
import { saveAs } from'file-saver'




/////////////////////////////////////////////////////////////////////////////////////////////
// function readFile(file, process){ 
// 	const _reader = new FileReader();
// 	_reader.readAsBinaryString(file)
// 	_reader.onload = (e) =>{
// 		process(e.target.result)
// 	}
// }	

// function handleExportToXls(files){
// 	debugger
// 	readFile(files[0], function(data){
// 		XlsxPopulate.fromDataAsync(data).then(workbook => {
// 			// Modify the workbook.
// 			workbook.sheet("Sheet1").cell("A1").value("This is neat!");
			
// 			// Write to file.
// 			// return workbook.toFileAsync("./out.xlsx");
// 			return workbook.outputAsync().then(function (blob) {
// 				saveAs(blob,"test.xlsx");

// 			});
// 		})
// 	})
// }




/////////////////////////////////////// V2 /////////////////////////////////////////////////////////
// var XlsxTemplate = require('xlsx-template');

// function handleExportToXls(files){
//   // Load an XLSX file into memory
//   readFile(files[0], function(data) {
//       // Create a template
//       var template = new XlsxTemplate(data);

//       // Replacements take place on first sheet
//       var sheetNumber = 1;

//       // Set up some placeholder values matching the placeholders in the template
//       var values = {
//               extractDate: new Date(),
//               dates: [ new Date("2013-06-01"), new Date("2013-06-02"), new Date("2013-06-03") ],
//               people: [
//                   {name: "John Smith", age: 20},
//                   {name: "Bob Johnson", age: 22}
//               ]
//           };

//       // Perform substitution
//       template.substitute(sheetNumber, values);

//       // Get binary data
//       var data = template.generate();

//       // ...

//   });
// }


/////////////////////////////////////// V1 ////////////////////////////
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

function handleExportToXls(files){
  const _reader = new FileReader();
  let _f = files[0];	
	XlsxPopulate.fromDataAsync(_f)
  .then(function (workbook) {
  	console.log(workbook)
  })
      
  // _reader.readAsBinaryString(_f)

  // _reader.onload = (e) =>{

  // //   let _data = e.target.result;
  // //   let _workbook = XLSX.read(_data, {type:'binary'});
		// // console.log( _workbook )

		// // let wbout = XLSX.write(_workbook,{ bookType:'xlsx', bookSST:false, type:'binary' })
		// // saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream;charset=windows-1251"}), "test.xlsx");



  // }
};

export default function ExpotToXls(props){
	const {movements} = props
	const exportButton =
							<ReactFileReader fileTypes={[".xls",".xlsx"]} handleFiles={handleExportToXls}>
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