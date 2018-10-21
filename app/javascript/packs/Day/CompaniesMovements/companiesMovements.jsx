import React from "react"
import PropTypes from "prop-types"
import {OneCompany} from "./oneCompany"


const TableHead = () => {
  return(
  	<thead>
  		<tr>
	  		<th rowSpan="2" className="c1">Код компанії</th>
	  		<th colSpan="3" className="clong">Вх. залишок</th>

  			<th colSpan="3" className="clong">Отримано</th>

				<th rowSpan="2" className="cshort">Примітки</th>

  			<th colSpan="3" className="clong">Витрачено</th>

	  		<th rowSpan="2" className="cshort">Примітки</th>
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

export class CompaniesMovements extends React.Component{
	constructor(props){
		super(props)
	}
	
	render(){
		return(
			<div className='table-responsive'>
				<table className="table movements-table">
					<TableHead/>
					<tbody>
						{ 
							this.props.companies.map( (c) => 
								(<OneCompany 
									key={c.id} 
									company={c} 
									movements={this.props.allMovements.filter( m => m.company_id == c.id)} 
								/>) 
							) 
						}
					</tbody>
				</table>
			</div>	
		)

	}

}

CompaniesMovements.Proptypes = {
	companies: PropTypes.array.isRequired,
	date: PropTypes.string.isRequired,
	allMovements: PropTypes.array.isRequired
}