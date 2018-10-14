import React from "react"
import PropTypes from "prop-types"

export class OneCompany extends React.Component{
	constructor(props){
		super(props)

	}


	
	render(){
		const {company, movements} = this.props
		return(
			<div className="row">
				{	company.code_name}
				{ movements.map( m => m.comment) }

				<hr className="my-hr-left col-md-12 align-center"/>

			</div>	
		)

	}

}

OneCompany.Proptypes = {
	company: PropTypes.object.isRequired,
	movements: PropTypes.array

}