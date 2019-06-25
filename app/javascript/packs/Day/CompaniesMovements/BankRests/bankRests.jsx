import React from "react"

function BankTableHead(props){
	const {banks} = props
  return(
  	<thead>
  		<tr> 
  			<th>Код компанії</th>
	  		{	banks.map(bank => (
  				<th key={bank}> 
  				  <div className="bank-name"> {bank}</div>
  					<div className="rest-val">UAH</div>
						<div className="rest-val">USD</div>
						<div className="rest-val">EUR</div>
  				</th>

  			))}  			
  		</tr>
  		


  	</thead>
  )
}

export function BankRests(props) {
	return(	
  	<table className="table movements-table rests-table">
			<BankTableHead banks={props.banks}/>
		</table>
	)
}