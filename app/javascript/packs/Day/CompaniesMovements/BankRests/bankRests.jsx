import React, {useContext} from "react"
import {accountsSaldo, sumMovsByCurrency} from "../oneCompany"
import {VocContext} from "../../day"

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
	const {uniqBanks, accountsSelected} = props
	return (
		<tbody>	
			{companies.map(c => (
				<tr key={c.id}>
					<CompanyRests 
						company={c} 
						accounts={accountsSelected.filter(a => a.company_id==c.id)}
						uniqBanks={uniqBanks}
					/>
				</tr>
			))}
		</tbody>
	)
}

function CompanyRests(props) {
	const {company, accounts, uniqBanks} = props
	return(
		<React.Fragment>
			<td>{company.code_name}</td>
			{uniqBanks.map(bank=>(
				<td key={bank.id}>{bank.name}</td>


			))}
			
		</React.Fragment>
		
	
	)
}

export function BankRests(props) {
	const {accsList, allMovements, companiesSelectedIds} = props

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

	const voc = useContext(VocContext)

	return(	
  	<table className="table movements-table rests-table">
			<BankTableHead uniqBanks={uniqBanks} />
			<BankTable uniqBanks={uniqBanks} accountsSelected={accountsSelected} companiesSelectedIds={companiesSelectedIds} compList = {voc.compList}/>
		</table>
	)
}
