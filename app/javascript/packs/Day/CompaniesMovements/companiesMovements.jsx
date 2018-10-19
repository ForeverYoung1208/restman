import React from "react"
import PropTypes from "prop-types"
import {OneCompany} from "./oneCompany"

const HeadDivs = () => {
  return(
  	<div className="row itable-head">
  		<div className="col-md-1">Код компанії</div>
  		<div className="col-md-1">Вх. залишок</div>
  		<div className="col-md-2 container-fluid">
  			<div className="row">Отримано</div>
  			<div className="row">
  				<div className="col-md-4">USD</div>
  				<div className="col-md-4">EUR</div>
  				<div className="col-md-4">UAH</div>
  			</div>
  		</div>
			<div className="col-md-1">Примітки</div>
  		<div className="col-md-2 container-fluid">
  			<div className="row">Витрачено</div>
  			<div className="row">
  				<div className="col-md-4">USD</div>
  				<div className="col-md-4">EUR</div>
  				<div className="col-md-4">UAH</div>
  			</div>
  		</div>  		
  		<div className="col-md-1">Примітки</div>
  		<div className="col-md-1">Вих. залишок</div>
  	</div>
  )
}

const HeadTable = () => {
  return(
  	<thead className="row itable-head">
  		<th className="col-md-1">Код компанії</th>
  		<th className="col-md-1">Вх. залишок</th>
  		<th className="col-md-2 container-fluid">
  			<th className="row">Отримано</th>
  			<th className="row">
  				<th className="col-md-4">USD</th>
  				<th className="col-md-4">EUR</th>
  				<th className="col-md-4">UAH</th>
  			</th>
  		</th>
			<th className="col-md-1">Примітки</th>
  		<th className="col-md-2 container-fluid">
  			<th className="row">Витрачено</th>
  			<th className="row">
  				<th className="col-md-4">USD</th>
  				<th className="col-md-4">EUR</th>
  				<th className="col-md-4">UAH</th>
  			</th>
  		</th>  		
  		<th className="col-md-1">Примітки</th>
  		<th className="col-md-1">Вих. залишок</th>
  	</thead>
  )
}

const HeadTable2 = () => {
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
				<HeadTable2/>
			</table>

				{ 
					this.props.companies.map( (c) => 
						(<OneCompany 
							key={c.id} 
							company={c} 
							movements={this.props.allMovements.filter( m => m.company_id == c.id)} 
						/>) 
					) 
				}

			</div>	
		)

	}

}

CompaniesMovements.Proptypes = {
	companies: PropTypes.array.isRequired,
	date: PropTypes.string.isRequired,
	allMovements: PropTypes.array.isRequired
}