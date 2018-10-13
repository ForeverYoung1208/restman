import React from "react"
import PropTypes from "prop-types"

export class OneCompany extends React.Component{
	constructor(props){
		super(props)

	}

	componentDidMount = () => {
		console.log( this.props.movements)
	  
	}
	

	render(){
		return(
			<div className="row">
				{	this.props.company.code_name}

				<hr className="my-hr-left col-md-12 align-center"/>

			</div>	
		)

	}

}

OneCompany.Proptypes = {
	company: PropTypes.object.isRequired,
	movements: PropTypes.array

}