import React from "react"

function BankTableHead(props){
	const {banks} = props
  return(
  	<thead>
  		<tr> 
	  		{	banks.map(bank => (
  				<th key={bank}> {bank}
  					<div className="row">
  						<div className="col-md-4">UAH</div>
  						<div className="col-md-4">USD</div>
  						<div className="col-md-4">EUR</div>
  					</div>
  				</th>

  			))}  			
  		</tr>
  		

  		TODO  !!!! UNDER CONSTRUCTION HERE

  		<tr>
	  		<th rowSpan="2" className="c1">Код компанії</th>
	  		<th colSpan="3" className="clong">Вх. залишок</th>

  			<th colSpan="3" className="clong">Отримано</th>

				<th rowSpan="2" className="cshort">Примітки
					

				</th>

  			<th colSpan="3" className="clong">Витрачено</th>

	  		<th rowSpan="2" className="cshort">Примітки

	  		</th>
	  		<th colSpan="3" className="clong">Вих. залишок</th>

	  	</tr>

			<tr >

				<th>UAH</th>
				<th>USD</th>
				<th>EUR</th>

				<th>UAH</th>
				<th>USD</th>
				<th>EUR</th>

				<th>UAH</th>
				<th>USD</th>
				<th>EUR</th>
				
				<th>UAH</th>
				<th>USD</th>
				<th>EUR</th>

			</tr>

  	</thead>
  )
}

export function BankRests(props) {
	return(	
		<BankTableHead banks={props.banks}/>
	)
}