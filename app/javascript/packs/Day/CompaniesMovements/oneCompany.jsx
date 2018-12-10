import React from "react"
import PropTypes from "prop-types"
import Gcomment from "./gcomment"
import {EditMovement} from "./EditMovement/editMovement"
import {Button } from 'reactstrap'


const Comment = (props) => {
	const {movement, ddirection, dcurrency} = props
	let res = ''
	if (movement.direction==ddirection && movement.currency == dcurrency ){
		res = <div className="row">
						<div className="col-md-11 p-0">
							{movement.value} {movement.currency_ukr} - {movement.group_name} ({movement.comment})
						</div>

						<div className="col-md-1 p-0">
							<Button type="button" className="btn btn-light p-0">
								<span className="far fa-edit"></span>
							</Button>
						</div>			
					</div>
	}
	return (
		<div> 
			{res} 
		</div>);
}

Comment.propTypes = {
	movement: PropTypes.object.isRequired,
	ddirection: PropTypes.string.isRequired,
	dcurrency: PropTypes.string.isRequired
}


class CommentsBlock extends React.Component{
	constructor(props){
		super(props)
		this.state={
			edMovId: null
		}
	}

	render(){
		const {movements, direction, mGroupsList, voc} = this.props
		const emptyMovVals = {
			company_id: 0,
			day_id: 0,
			direction: direction
		}

		return(
			<div>
				<div className="container-fluid">

					{movements.map( m => 
						<Comment key ={m.id} movement = {m} ddirection={direction} dcurrency='UAH' /> ) }
					{movements.map( m => 
						<Comment key ={m.id} movement = {m} ddirection={direction} dcurrency='USD' /> ) }
					{movements.map( m => 
						<Comment key ={m.id} movement = {m} ddirection={direction} dcurrency='EUR' /> ) }
				</div>

				<EditMovement voc = {voc} defMovVals = {emptyMovVals}/>			

			</div>
		)
	}
}
CommentsBlock.propTypes = {
	movements: PropTypes.array.isRequired,
	direction: PropTypes.string.isRequired,
	voc: PropTypes.object.isRequired
}



export class OneCompany extends React.Component{
	constructor(props){
		super(props)
	}

	sumMovsByCurrency = (currency = 'UAH', allMovs) => {
		let income = 0, outcome = 0
		let sum = 0
		if (allMovs && allMovs.length>0){
			income = allMovs.reduce( (sum, m) =>  (m.direction=='Income' && m.currency==currency) ? (sum += m.value ) : sum, sum = 0)
			outcome = allMovs.reduce( (sum, m) =>  (m.direction=='Outcome' && m.currency==currency) ? (sum += m.value ) : sum, sum = 0)
		}
	  return {income: income, outcome:outcome}
	}


	
	render(){
		const {company, movements, isGrouped, voc} = this.props
		return(

			<tr >
				<td className="i-text">{	company.code_name}, (id: {company.id})</td>

				<td>UAH</td>
				<td>USD</td>
				<td>EUR</td>

				<td>{this.sumMovsByCurrency('UAH', movements).income}</td>
				<td>{this.sumMovsByCurrency('USD', movements).income}</td>
				<td>{this.sumMovsByCurrency('EUR', movements).income}</td>
				<td className="i-text">


					{isGrouped ? <Gcomment
												movements={movements} 
												company_id={company.id}
												direction='Income'
											/> 
										: <CommentsBlock 
												movements={movements} 
												voc={{...this.props.voc, company_id: company.id}}
												direction='Income'
											/> 
					}

				</td>


				<td>{this.sumMovsByCurrency('UAH', movements).outcome}</td>
				<td>{this.sumMovsByCurrency('USD', movements).outcome}</td>
				<td>{this.sumMovsByCurrency('EUR', movements).outcome}</td>
				<td className="i-text">

					{isGrouped ? <Gcomment
												movements={movements} 
												company_id={company.id}
												direction='Outcome'
											/> 
										: <CommentsBlock 
												movements={movements} 
												voc={{...this.props.voc, company_id: company.id}}
												direction='Outcome'
											/> 
					}

				</td>
				
				<td>UAH</td>
				<td>USD</td>
				<td>EUR</td>


			</tr>

		)

	}

}

OneCompany.propTypes = {
	company: PropTypes.object.isRequired,
// code_name: "ISR"
// group_id: 1
// id: 1

	movements: PropTypes.array,
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
	isGrouped: PropTypes.bool.isRequired,
	voc: PropTypes.object.isRequired

}

