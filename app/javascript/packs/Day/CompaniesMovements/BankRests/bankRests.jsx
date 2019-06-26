import React from "react"
import {accountsSaldo, sumMovsByCurrency} from "../oneCompany"

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
	return null
}

export function BankRests(props) {
	const {accsList, allMovements, companiesSelectedIds} = props
	const accounts = accsList.filter(a=>companiesSelectedIds.includes(a.company_id))
	const movements = allMovements.filter(m=>companiesSelectedIds.includes(m.company_id))
	const banks = accounts.map( (a,ind,arr) => arr.indexOf(a)==ind ? a.bank.name : null)
	const uniqBanks = [...new Set(banks)];


	console.log({accounts, movements, companiesSelectedIds, uniqBanks})
	return(	
  	<table className="table movements-table rests-table">
			<BankTableHead banks={uniqBanks} />
			<BankTable accounts={accounts} />
		</table>
	)
}
