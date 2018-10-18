import React from "react"
import PropTypes from "prop-types"
import {OneCompany} from "./oneCompany"

const Head = () => {
  return(
  	<div className="row itable-head">
  		<div className="col-md-1">Код компанії</div>
  		<div className="col-md-1">Вх. залишок</div>
  		<div className="col-md-3 container-fluid">
  			<div className="row">Отримано</div>
  			<div className="row">
  				<div className="col-md-4">USD</div>
  				<div className="col-md-4">EUR</div>
  				<div className="col-md-4">UAH</div>
  			</div>
  		</div>
			<div className="col-md-1">Примітки</div>
  		<div className="col-md-3 container">
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

export class CompaniesMovements extends React.Component{
	constructor(props){
		super(props)
	}
	
	render(){
		return(
			<div className='col-md-12'>
				<Head />

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