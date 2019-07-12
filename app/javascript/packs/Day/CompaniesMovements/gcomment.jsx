import React from "react"
import PropTypes from "prop-types"
import {AddNaN} from "../../i-services"
import 'array-flat-polyfill';


export default class Gcomment extends React.Component {
	constructor(props){
		super(props)
	}

	movementsSum = (movements) => {
		let res = {UAH:{}, USD:{}, EUR:{}}
		movements.forEach( (m) =>{
			res[m.currency][m.group_name] = { 
				value: AddNaN(res[m.currency][m.group_name] ? res[m.currency][m.group_name].value : 0 , m.value) ,
				comment: ( (res[m.currency][m.group_name]&&res[m.currency][m.group_name].comment.length>1) ? res[m.currency][m.group_name].comment+', ' : '') + (m.comment ? m.comment : '')
			}
		})
		return(res)
	}

	render(){
		const {voc,company} = this.props
		const direction = this.props.direction.toLowerCase()
		// const {currsList} = this.props.voc
		const ms = this.movementsSum(this.props.movements)
		const res =	['UAH','USD','EUR'].map( (curr) => 
					 	Object.keys(ms[curr]).map(
					 		group => `${Math.round(ms[curr][group].value)} ${voc.currsList.filter( c => c.name_int ==curr )[0].name_ukr} - ${group}` +
					 				 (ms[curr][group].comment.length > 0 ? ` (${ms[curr][group].comment}); ` : '; ')
					 	)
				 	)

		return (
			<div>
				 { 
				 	voc.addToExportBufer( company, `${direction}_detail`, res.flat().join('') ) 
				 }
			</div>
		);
	}
}

Gcomment.propTypes = {
	direction: PropTypes.string.isRequired,
	company: PropTypes.object.isRequired,
	movements: PropTypes.array.isRequired,
	voc:PropTypes.object.isRequired,
}

//test
