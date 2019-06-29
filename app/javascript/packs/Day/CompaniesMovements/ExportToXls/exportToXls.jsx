import React from 'react'
import { Button } from 'reactstrap'
// import XLSX from "js-xlsx";
// import XlsxPopulate  from 'xlsx-populate'
import {roundFin} from "../../../i-services"

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


////////////////IT WORKS but there is more simple way to manage substitution!!!
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

// fnfe = formatNumberForExport
function fnfe(n) {
  return Math.round(n)
}

function handleExportToXls(fileTemplate,exportBuffer,date,companyGroupName){
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
          };
      exportBuffer.forEach((eb,index)=>{
      	let suffix
        eb.company_id == 'total' ? suffix = 'total' : suffix = index
        	

       	values['company_id-'+suffix]=eb.company_id
        values['companyCodeName-'+suffix]=eb.companyCodeName
        values['companyCodeName-'+suffix]=eb.companyCodeName
        values['in-uah-'+suffix] = fnfe(eb.in_uah)
        values['in-usd-'+suffix] = fnfe(eb.in_usd)
        values['in-eur-'+suffix] = fnfe(eb.in_eur)
        values['income-uah-'+suffix] = fnfe(eb.income_uah)
        values['income-usd-'+suffix] = fnfe(eb.income_usd)
        values['income-eur-'+suffix] = fnfe(eb.income_eur)
        values['income-detail-'+suffix] = eb.income_detail
        values['outcome-uah-'+suffix] = fnfe(eb.outcome_uah)
        values['outcome-usd-'+suffix] = fnfe(eb.outcome_usd)
        values['outcome-eur-'+suffix] = fnfe(eb.outcome_eur)
        values['outcome-detail-'+suffix] = eb.outcome_detail
        values['out-uah-'+suffix] = fnfe(eb.out_uah)
        values['out-usd-'+suffix] = fnfe(eb.out_usd)
        values['out-eur-'+suffix] = fnfe(eb.out_eur)
        values['depo-uah-'+suffix] = fnfe(eb.depo_uah)
        values['depo-usd-'+suffix] = fnfe(eb.depo_usd)
        values['depo-eur-'+suffix] = fnfe(eb.depo_eur)
        values['depo-detail-'+suffix] = eb.depo_detail
      })

      console.log({substitute: values})

      // Perform substitution
      template.substitute(sheetNumber, values);
      // Get binary data
      let data = template.generate({type: 'blob'});
      saveAs(data, "test.xlsx");
  }
}
/////////////////////////////////////

export default function ExpotToXls(props){
	const {voc, movements, date,companyGroupName} = props
  const exportBuffer = voc.readExportBuffer()
  console.log( {exportBuffer: exportBuffer} )
	const exportButton =
							<ReactFileReader fileTypes={[".xls",".xlsx"]} handleFiles={(files)=>handleExportToXls(files[0], exportBuffer, date,companyGroupName)}>
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