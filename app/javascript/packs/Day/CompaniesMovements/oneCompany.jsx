import React from "react"
import PropTypes from "prop-types"

const Comment = (props) => {
	const {movement, ddirection} = props
	let res = ''
	if (movement.direction = ddirection){
		res = movement.comment+'; '
	}
	return res;
}
Comment.Proptypes = {
	movement: PropTypes.object.isRequired
}


export class OneCompany extends React.Component{
	constructor(props){
		super(props)
		console.log(this.getMovsByCurrency("UAH", props.movements))

	}

	getMovsByCurrency = (currency = 'UAH', allMovs) => {
		let income = 0, outcome = 0
		let sum = 0
		if (allMovs && allMovs.length>0){
			income = allMovs.reduce( (sum, m) =>  m.direction=='Income' && m.currency==currency ? (sum += parseFloat(m.value) ) : sum, sum = 0)
			outcome = allMovs.reduce( (sum, m) =>  m.direction=='Outcome' && m.currency==currency ? (sum += parseFloat(m.value) ) : sum, sum = 0)
		}
	  return {income: income, outcome:outcome}
	}



	
	render(){
		const {company, movements} = this.props
		return(

			<tr >
				<td className="i-text">{	company.code_name}, (id: {company.id})</td>

				<td>UAH</td>
				<td>USD</td>
				<td>EUR</td>

				<td>{this.getMovsByCurrency('UAH', movements).income}</td>
				<td>{this.getMovsByCurrency('USD', movements).income}</td>
				<td>{this.getMovsByCurrency('EUR', movements).income}</td>
				<td className="i-text">{movements.map( m => <Comment key ={m.id} movement = {m} ddirection='Income' /> ) }</td>

				<td>{this.getMovsByCurrency('UAH', movements).outcome}</td>
				<td>{this.getMovsByCurrency('USD', movements).outcome}</td>
				<td>{this.getMovsByCurrency('EUR', movements).outcome}</td>
				<td className="i-text">notes</td>
				
				<td>UAH</td>
				<td>USD</td>
				<td>EUR</td>


			</tr>

		)

	}

}

OneCompany.Proptypes = {
	company: PropTypes.object.isRequired,
// code_name: "ISR"
// group_id: 1
// id: 1

	movements: PropTypes.array
// account_id: 1
// comment: "Some comment"
// company_id: 1
// created_at: "2018-09-27T19:29:15.000Z"
// day_id: 1
// deleted_at: null
// direction: "Income"
// group_id: 1
// id: 1
// last_editor_id: 1
// log: "log here"
// updated_at: "2018-09-27T19:29:15.000Z"
// value: "1010.23"
// currency: 'UAH'

}

