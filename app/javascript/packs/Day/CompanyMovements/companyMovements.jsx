import React from "react"
import PropTypes from "prop-types"
import {OneCompany} from "./oneCompany"

export class CompanyMovements extends React.Component{
	constructor(props){
		super(props)
		const {companies} = props

	}

	ComponentDidMount = () => {
	  
	}
	

	render(){
		return(
			<div>
				{ companies.map( (c) => (<OneCompany company = {c} />) )}

			</div>	
		)

	}

}

CompanyMovements.Proptypes = {
	companies: PropTypes.array.isRequired

}