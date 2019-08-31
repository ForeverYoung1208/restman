import React from "react"
// import React, {useContext} from "react"
// import {VocContext} from "../../day"

import { Button } from 'reactstrap'
import {roundFin, straightDateFormat} from "../../../i-services"

import Moment from "moment"
import ReactFileReader from "react-file-reader"
import { saveAs } from'file-saver'
let XlsxTemplate = require('xlsx-template');


// fnfe = formatNumberForExport
function fnfe(n) {
  return Math.round(n)
}

function handleExportToXls(fileTemplate,exportBuffer,date,companyGroupName,banks){
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

        banks.forEach( b => {
          values['UAH-'+suffix+'-restBank-'+b.id] = fnfe(eb['UAHrestBank-'+b.id])
          values['USD-'+suffix+'-restBank-'+b.id] = fnfe(eb['USDrestBank-'+b.id])
          values['EUR-'+suffix+'-restBank-'+b.id] = fnfe(eb['EURrestBank-'+b.id])
        })

        //prepare deposits information
        let companyDeposits = []
        eb.allDeposits.forEach((bankDeposits)=>{
          bankDeposits.deposits.forEach(deposit=>{
            companyDeposits.push({
              bankName: bankDeposits.bankName,
              currency: bankDeposits.currency,
              interest: deposit.interest,
              term: deposit.term,
              value: deposit.value,
            })
          })
        })
        let nomer = 0
        companyDeposits.sort((a1,a2)=> {
          if (a1.term>a2.term){return 1}
          if (a1.term<a2.term){return -1}
            return 0
        }).forEach(deposit=>{
          banks.forEach( b => {
            values[`dep-${deposit.currency}-cmp-${suffix}-depoDesc-${nomer}`] = `${deposit.interest} до ${deposit.term}`
            values[`dep-${deposit.currency}-cmp-${suffix}-depoValue-${nomer}-bank-${deposit.bankName}`] = fnfe(deposit.value)
            // values['USD-'+suffix+'-restBank-'+b.id] = fnfe(eb['USDrestBank-'+b.id])
            // values['EUR-'+suffix+'-restBank-'+b.id] = fnfe(eb['EURrestBank-'+b.id])
          })
          nomer += 1



        })




          
      })



      console.log({substitute: values})

      // Perform substitution
      template.substitute(sheetNumber, values);
      // Get binary data
      let data = template.generate({type: 'blob'});

      //compose filename with current date
      let fileName = fileTemplate.name.substring(0, fileTemplate.name.length-11)+straightDateFormat(date)+'.xlsx'

      saveAs(data, fileName);
  }
}
/////////////////////////////////////

export default function ExpotToXls(props){
	const {voc, movements, date,companyGroupName} = props

  const uniqBanks = voc.banksOfAccounts();

  console.log(uniqBanks)

  const exportBuffer = voc.readExportBuffer()
  console.log( {exportBuffer: exportBuffer} )
	const exportButton =
							<ReactFileReader fileTypes={[".xls",".xlsx"]} handleFiles={(files)=>handleExportToXls(files[0], exportBuffer, date,companyGroupName, uniqBanks)}>
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