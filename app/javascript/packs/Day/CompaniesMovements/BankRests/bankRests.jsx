import React, {useContext} from "react"
import {VocContext} from "../../day"

import {accountsSaldo, sumMovsByCurrency} from "../oneCompany"
import {roundDisp} from "../../../i-services"

function BankTableHead(props){
	const {uniqBanks} = props

	return(
  	<thead>
  		<tr> 
  			<th rowSpan="2">Код компанії</th>
	  		{	uniqBanks.map(bank => (
  				<React.Fragment key={bank.id}> 
  				  <th colSpan="3"> {bank.name}</th>
  				</React.Fragment>
  			))}  			
  		</tr>
  		<tr>

	  		{	uniqBanks.map(bank => (
  				<React.Fragment key={bank.id}> 
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
	const {uniqBanks, accountsSelected, movements} = props
	return (
		<tbody>	
			{companies.map(c => (
				<tr key={c.id}>
					<CompanyRests 
						company={c} 
						accounts={accountsSelected.filter(a => a.company_id==c.id)}
						uniqBanks={uniqBanks}
						movements={movements}
					/>
				</tr>
			))}
			<tr className="movementsTotal">
				<CompanyRests 
					company={null} 
					accounts={accountsSelected}
					uniqBanks={uniqBanks}
					movements={movements}
				/>
			</tr>

		</tbody>
	)
}

function CompanyRests(props) {
	const {company, accounts, uniqBanks, movements} = props
	return(
		<React.Fragment>
			<td>{company ? company.code_name : 'Загалом'}</td>
			{uniqBanks.map(bank=>(
				<React.Fragment key={bank.id}>
				  <td>{roundDisp(accountsSaldo(accounts.filter(a=> bank.id==-1 || a.bank.id ==bank.id ), movements, company).UAH.end)}</td>
					<td>{roundDisp(accountsSaldo(accounts.filter(a=> bank.id==-1 || a.bank.id ==bank.id ), movements, company).USD.end)}</td>
					<td>{roundDisp(accountsSaldo(accounts.filter(a=> bank.id==-1 || a.bank.id ==bank.id ), movements, company).EUR.end)}</td>
				</React.Fragment>
			))}
		</React.Fragment>
	)
}

export function BankRests(props) {
	const {accsList, allMovements, companiesSelectedIds} = props
	const voc = useContext(VocContext)

	const accountsSelected = accsList.filter(a=>companiesSelectedIds.includes(a.company_id))
	const movements = allMovements.filter(m=>companiesSelectedIds.includes(m.company_id))

	//get only banks that are present in selected companies
	const banksSelected = accountsSelected.map( (a,ind,arr) => arr.indexOf(a)==ind ? a.bank : null)
	
	// remove duplicate banks
	// that was good for plain array of simple strings:
	// const uniqBanks = [...new Set(banksSelected)];
	// but we have the array of objects and we have compare them on 'id' property:
	let uniqBanks = []
	banksSelected.forEach( (bs) => {
		uniqBanks.find(ub => bs.id == ub.id) ? null : uniqBanks.push(bs)
	})
	uniqBanks.push({
		id: -1,
		name: 'Всі'
	})


	return(	
  	<table className="table movements-table rests-table">
			<BankTableHead uniqBanks={uniqBanks} />
			<BankTable 
				uniqBanks={uniqBanks} 
				accountsSelected={accountsSelected} 
				companiesSelectedIds={companiesSelectedIds} 
				compList = {voc.compList}
				movements = {movements}
			/>
		</table>
	)
}
