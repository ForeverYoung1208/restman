import React from "react"
import PropTypes from "prop-types"

export class OneCompany extends React.Component{
	constructor(props){
		super(props)
		const {company} = props
	}

	ComponentDidMount = () => {
	  
	}
	

	render(){
		return(
			<div>
				{ company.code_name}
			</div>	
		)

	}

}

OneCompany.Proptypes = {
	company: PropTypes.object.isRequired

}