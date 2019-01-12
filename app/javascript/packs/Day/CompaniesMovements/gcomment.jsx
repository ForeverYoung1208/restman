import React from "react"
import PropTypes from "prop-types"
import {AddNaN} from "../../i-services"


export default class Gcomment extends React.Component {
	constructor(props){
		super(props)
	}

	movementsSum = (movements) => {
		let res = {UAH:{}, USD:{}, EUR:{}}
		movements.forEach( (m) =>{
			res[m.currency][m.group_name] = { 
				value: AddNaN(res[m.currency][m.group_name] ? res[m.currency][m.group_name].value : 0 , m.value) ,
				comment: ( (res[m.currency][m.group_name]&&res[m.currency][m.group_name].length>1) ? res[m.currency][m.group_name].comment+', ' : '') + (m.comment ? m.comment : '')
			}
		})
		return(res)
	}

	render(){
		const {currsList} = this.props.voc
		const ms = this.movementsSum(this.props.movements)

		return (
			<div>
				 { 
				 	['UAH','USD','EUR'].map( (curr) => 
					 	Object.keys(ms[curr]).map(
					 		group => `${ms[curr][group].value} ${currsList.filter( c => c.name_int ==curr )[0].name_ukr} - ${group}` +
					 				 (ms[curr][group].comment.length > 0 ? ` (${ms[curr][group].comment}); ` : '; ')
					 	)
				 	)
				 }
			</div>
		);
	}
}

Gcomment.propTypes = {
	movements: PropTypes.array.isRequired,
	voc:PropTypes.object.isRequired,
}

