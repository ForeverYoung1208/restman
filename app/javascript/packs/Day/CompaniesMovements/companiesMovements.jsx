import React from "react"
import PropTypes from "prop-types"
import {OneCompany} from "./oneCompany"


export class CompaniesMovements extends React.Component{
	constructor(props){
		super(props)
	}
	
	render(){
		return(
			<div className='col-md-12'>

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