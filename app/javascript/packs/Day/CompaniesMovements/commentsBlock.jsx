import React from "react"
import PropTypes from "prop-types"
import ReactFileReader from "react-file-reader"
import {EditMovement} from "./EditMovement/editMovement"
import {Button, Input } from 'reactstrap'
import {Spinner} from "../../i-services"

import {readOshchad} from "../../converter_oshchad/converter_oshchad"

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
				movement_group_id: movement.movement_group_id,
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
							(id:{movement.id}) {movement.value} {movement.currency_ukr} - {movement.group_name} ({movement.comment})
						</div>

						<div className="col-md-1 p-0">
							<Button type="button" className="btn btn-light p-0" onClick={ ()=> props.edClick(movement.id) }>
								<span className="far fa-edit"></span>
							</Button>
						</div>			
					</div>
	}
	return (res);
}

Comment.propTypes = {
	movement: PropTypes.object.isRequired,
	edMovId: PropTypes.array,
	edClick: PropTypes.func.isRequired
}


export class CommentsBlock extends React.Component{
	constructor(props){
		super(props)
		this.state={
			edMovId: []
		}
	}

	edClickHandle = (edId)=>{
		this.setState({
			edMovId: [...this.state.edMovId, edId]
		})
		
	}


	_handleMassMovAdd = (e)=>{
		readOshchad(e).then((oshchadMovements)=>{

			const newMovIds = this.props.voc.handleMassMovAdd(oshchadMovements, this.props.voc.company_id)
			this.setState({
				edMovId: [...this.state.edMovId, ...newMovIds]
			})

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
			id: -1,
			company_id: voc.company_id,
			day_id: 0,
			currency_id: 0,
			movement_group_id: 0,
			account_id: 0,
			direction: direction
		}

		const addButton = <div className="row justify-content-center">
						<div className="col-5 p-0">
							<Button type="button" className="btn btn-light p-0 my-vButton" onClick={()=>this.edClickHandle(-1)}>
								<span className="fa fa-plus"></span>
							</Button>
						</div>
						<div className="col-5 p-0">
							<ReactFileReader fileTypes={[".xls",".xlsx"]} handleFiles={this._handleMassMovAdd}>
							  <Button type="button" className="btn btn-light p-0 my-vButton massAddBtn">
								<span className="fa fa-cart-plus"></span>
									виписка ОБ
								</Button>	
							</ReactFileReader>
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
									<div className="col-md-5 p-3 text-center ">...Processing...</div>
									<div className="col-md-5 p-1 spinner">
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
					{this.state.edMovId.includes(-1) ? (

																							loadingMovementsIds.includes(-1) ? 
																							<div className="row">
																								<div className="col-md-5 p-3 text-center ">...Processing...</div>
																								<div className="col-md-5 p-1 spinner">
																									<Spinner /> 
																								</div>
																							</div>
																							:
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
	// voc: PropTypes.object.isRequired,   //+ company_id needed
	voc: PropTypes.shape({
		company_id: PropTypes.number.isRequired,
		handleMassMovAdd: PropTypes.func.isRequired		
	}).isRequired,
	loadingMovementsIds: PropTypes.array.isRequired
}