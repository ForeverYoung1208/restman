import React, {useContext} from "react"
import {accountsSaldo, sumMovsByCurrency} from "../oneCompany"
import {VocContext} from "../../day"

function BankTableHead(props){
	const {banks} = props
	
	return(
  	<thead>
  		<tr> 
  			<th rowSpan="2">Код компанії</th>
	  		{	banks.map(bank => (
  				<React.Fragment key={bank}> 
  				  <th colSpan="3"> {bank}</th>
  				</React.Fragment>
  			))}  			
  		</tr>
  		<tr>

	  		{	banks.map(bank => (
  				<React.Fragment key={bank}> 
  				  <th>UAH</th>
  					<th>USD</th>
						<th>EUR</th>
  				</React.Fragment>
  			))}  			
  		</tr>
  	</thead>
  )
}

function BankTable(props) {
	
	const companies = props.compList.filter(c => props.companiesSelectedIds.includes(c.id))

	console.log({props, companies})

	return (
		<tbody>	
			{companies.map(c => (
				<tr key={c.id}><td>{c.code_name}</td></tr>
			))}
		</tbody>
	)


}

export function BankRests(props) {
	const {accsList, allMovements, companiesSelectedIds} = props

	const accounts = accsList.filter(a=>companiesSelectedIds.includes(a.company_id))
	const movements = allMovements.filter(m=>companiesSelectedIds.includes(m.company_id))
	const banks = accounts.map( (a,ind,arr) => arr.indexOf(a)==ind ? a.bank.name : null)
	const uniqBanks = [...new Set(banks)];
	const voc = useContext(VocContext)

	return(	
  	<table className="table movements-table rests-table">
			<BankTableHead banks={uniqBanks} />
			<BankTable banks={uniqBanks} accounts={accounts} companiesSelectedIds={companiesSelectedIds} compList = {voc.compList}/>
		</table>
	)
}
