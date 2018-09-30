import React from "react"
import PropTypes from "prop-types"
import {OneCompany} from "./oneCompany"

export class CompanyMovements extends React.Component{
	constructor(props){
		super(props)

	}

	ComponentDidMount = () => {
	  
	}
	

	render(){
		return(
			<div>
				{ 
					this.props.companies.map( (c) => (<OneCompany key={c.id} company={c} />) ) 
				}

			</div>	
		)

	}

}

CompanyMovements.Proptypes = {
	companies: PropTypes.array.isRequired

}