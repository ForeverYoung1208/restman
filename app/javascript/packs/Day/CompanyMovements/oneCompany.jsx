import React from "react"
import PropTypes from "prop-types"

export class OneCompany extends React.Component{
	constructor(props){
		super(props)
	}

	ComponentDidMount = () => {
	  
	}
	

	render(){
		return(
			<div>
				{ this.props.company.code_name}
			</div>	
		)

	}

}

OneCompany.Proptypes = {
	company: PropTypes.object.isRequired

}