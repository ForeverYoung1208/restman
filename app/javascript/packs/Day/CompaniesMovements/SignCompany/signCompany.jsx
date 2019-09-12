import React from "react"
import PropTypes from "prop-types"
import {Button} from "reactstrap"


export default class SignCompany extends React.Component{
	constructor(props){
		super(props)
	}

	tiptext = () => {
		const movements = this.props.movementsToSign

		// let t = ''
		// movements.forEach( m=> {
		// 	t=t+` (${m.id})-${m.log}; `
		// })
	 //  return t

	 return movements.reduce((res,m)=> res+`(${m.id})-${m.log}; `, '')
	}


	render(){
		const {voc, log, movementsToSign, company} = this.props

		return (
			movementsToSign.length<=0 ? //is there no movements?
				<Button className="btn btn-warning" disabled = {voc.isDayClosed()} 
					onClick={ e=> voc.handleNullMovsSign(company, log)}> Немає змін 
				</Button>
			: movementsToSign.length>0 && movementsToSign.find(m => !m.signed_by_id ) ?  //are there any unsigned movements?
					<Button className="btn btn-warning" disabled = {voc.isDayClosed()} 
					onClick={ e=> voc.handleMovsSign(movementsToSign, log)}> Підписати 
				</Button>
				: <Button className="btn btn-light"  data-toggle="tooltip" title={this.tiptext()} disabled> Підписано </Button>		
		)

	}

}

SignCompany.propTypes={
	company: PropTypes.shape({
		id: PropTypes.number.isRequired,
		code_name: PropTypes.string.isRequired,
	}).isRequired,
	movementsToSign: PropTypes.array.isRequired,
	log: PropTypes.string.isRequired,
	voc:PropTypes.shape({
		handleMovsSign: PropTypes.func.isRequired,
	}).isRequired
}