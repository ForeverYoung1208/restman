import React from "react"
import PropTypes from "prop-types"
import {Button} from "reactstrap"


export default class SignCompany extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		const {voc, log, movementsToSign} = this.props
		return (
			this.props.movementsToSign.find(m => !m.signed_by_id ) 
				?	<Button className="btn btn-warning" onClick={ e=> voc.handleMovsSign(movementsToSign, log)}> Підписати </Button>		
				: <Button className="btn btn-light" disabled> Підписано </Button>		
		)
	}

}

SignCompany.propTypes={
	movementsToSign: PropTypes.array.isRequired,
	log: PropTypes.string.isRequired,
	voc:PropTypes.shape({
		handleMovsSign: PropTypes.func.isRequired,
	}).isRequired
}