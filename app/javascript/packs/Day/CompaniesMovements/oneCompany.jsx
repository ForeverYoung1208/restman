import React from "react"
import PropTypes from "prop-types"
import Gcomment from "./gcomment"
import {EditMovement} from "./EditMovement/editMovement"
import {Button } from 'reactstrap'
import {Spinner} from "../../i-services"


const Comment = (props) => {
	const {movement, edMovId, voc, cancelClick} = props
	let res = ''
	if (edMovId.includes(movement.id)){
		res = <EditMovement 
			voc = {voc}
			cancelClick = {cancelClick}
			defMovVals = {{
				account_id: movement.account_id,
				comment: movement.comment,
				company_id: movement.company_id,
				day_id: movement.day_id,
				direction: movement.direction,
				group_id: movement.group_id,
				id: movement.id,
				log: movement.log,
				value: movement.value,
				currency: movement.currency,
				currency_id: movement.currency_id
			}}
		/>
	} else {
		res = <div className="row">
						<div className="col-md-11 p-0">
							(id:{movement.id}){movement.value} {movement.currency_ukr} - {movement.group_name} ({movement.comment})
						</div>

						<div className="col-md-1 p-0">
							<Button type="button" className="btn btn-light p-0" onClick={ ()=> props.edClick(movement.id) }>
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
	edMovId: PropTypes.array,
	edClick: PropTypes.func.isRequired
}


class CommentsBlock extends React.Component{
	constructor(props){
		super(props)
		this.state={
			edMovId: []
		}
	}

	edClickHandle = (edId) =>{
		this.setState({
			edMovId: [...this.state.edMovId, edId]
		})
		
	}

	edCancelHandle = (m) => {
		this.setState({
			edMovId: this.state.edMovId.filter(id => id !== m.id)
		})
	}

	render(){
		const {movements, direction, voc, loadingMovementsIds} = this.props
		const {edMovId} = this.state
		const emptyMovVals = {
			id:0,
			company_id: voc.company_id,
			day_id: 0,
			currency_id: 0,
			group_id: 0,
			account_id: 0,
			direction: direction
		}

		const addButton = <div className="row justify-content-center">
						<div className="col-6">
							<Button type="button" className="btn btn-light p-0 my-vButton" onClick={()=>this.edClickHandle(0)}>
								<span className="fa fa-plus"></span>
							</Button>
						</div>
					</div>

		return(
			<div>
				<div className="container-fluid">

					{	['UAH','USD','EUR'].map( (curr_name) => 
						{
							return movements.filter(m => m.currency==curr_name && m.direction==direction ).map( m => 
								loadingMovementsIds.includes(m.id) ? 
								<div className="row" key ={curr_name+m.id}>
									<div className="col-md-11 p-0">
										...Loading...
										<Spinner /> 
									</div>
								</div>
								:
								<Comment key ={curr_name+m.id} 
									movement = {m} 
									edMovId={edMovId} 
									edClick = {this.edClickHandle}
									cancelClick = {this.edCancelHandle}
									voc = {{...voc, emptyMovVals}}
									loadingMovementsIds = {loadingMovementsIds}
								/> 
							)
						})
					}

				</div>
				<div className="container-fluid">
					{this.state.edMovId.includes(0) ? (
																							<EditMovement
																							voc = {voc} 
																							defMovVals = {emptyMovVals} 
																							cancelClick = {this.edCancelHandle}/> 
																						)
																					: addButton 
					}
				</div>
			</div>
		)
	}
}
CommentsBlock.propTypes = {
	movements: PropTypes.array.isRequired,
	direction: PropTypes.string.isRequired,
	voc: PropTypes.object.isRequired,   //+ company_id needed
	loadingMovementsIds: PropTypes.array.isRequired
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
		const {company, movements, isGrouped, voc, loadingMovementsIds} = this.props
		const commentsWrapper = (direction) => {
			return(
					isGrouped ? <Gcomment
												movements={movements} 
												company_id={company.id}
												direction={p.direction}
												loadingMovementsIds={loadingMovementsIds}
											/> 
										: <CommentsBlock 
												movements={movements} 
												voc={{...this.props.voc, company_id: company.id}}
												direction={direction}
												loadingMovementsIds={loadingMovementsIds}
											/> 
			)
		}

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
					{	commentsWrapper('Income')	}

				</td>


				<td>{this.sumMovsByCurrency('UAH', movements).outcome}</td>
				<td>{this.sumMovsByCurrency('USD', movements).outcome}</td>
				<td>{this.sumMovsByCurrency('EUR', movements).outcome}</td>
				<td className="i-text">
					{	commentsWrapper('Outcome')	}
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
	voc: PropTypes.object.isRequired,
	loadingMovementsIds: PropTypes.array.isRequired

}

