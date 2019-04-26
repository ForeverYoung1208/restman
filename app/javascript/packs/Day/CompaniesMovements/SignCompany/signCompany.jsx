import React from "react"
import PropTypes from "prop-types"
import {Button} from "reactstrap"


export default class SignCompany extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			this.props.movementsToSign.find(m => !m.signed_by_id ) 
				?	<Button className="btn btn-warning" onClick={ e=> this.props.voc.handleMovsSign(this.props.movementsToSign)}> Підписати </Button>		
				: ''
		)
	}

}

SignCompany.propTypes={
	movementsToSign: PropTypes.array.isRequired,
	voc:PropTypes.shape({
		handleMovsSign: PropTypes.func.isRequired,
	}).isRequired
}