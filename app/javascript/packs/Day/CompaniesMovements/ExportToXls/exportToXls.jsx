import React from 'react'
import {Button} from 'reactstrap'
import XLSX from "js-xlsx";
import Moment from "moment"
import ReactFileReader from "react-file-reader"

function handleExportToXls(files){
  const _reader = new FileReader();
  let _f = files[0];	
  _reader.readAsBinaryString(_f)

  _reader.onload = (e) =>{
    let _data = e.target.result;
    let _workbook = XLSX.read(_data, {type:'binary'});
// console.log( _workbook )
// XLSX.writeFile(_workbook,'test.xlsx')	

		let wbout = XLSX.write(_workbook,{ bookType:'xlsx', bookSST:false, type:'binary' })
		saveAs(new Blob([wbout],{type:"application/octet-stream"}), "test.xlsx");

  }

}

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