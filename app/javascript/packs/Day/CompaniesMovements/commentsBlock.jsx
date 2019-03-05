import React from "react"
import PropTypes from "prop-types"
import ReactFileReader from "react-file-reader"
import {EditMovement} from "./EditMovement/editMovement"
import {Button, Input } from 'reactstrap'
import {Spinner} from "../../i-services"

import {readOshchad} from "../../converter_oshchad/converter_oshchad"

const Comment = (props) => {
	const {movement, editingMovementsIds, voc} = props
	const {edStartHandle} = props.voc
	let res = ''
	if (editingMovementsIds.includes(movement.id)){
		res = <EditMovement 
			voc = {voc}
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
				currency_id: movement.currency_id,
				is_changed: movement.is_changed,
			}}
		/>
	} else {
		res = <div className="row">
						<div className="col-md-11 p-0">
							(id:{movement.id}) {movement.value} {movement.currency_ukr} - {movement.group_name} ({movement.comment})
						</div>

						<div className="col-md-1 p-0">
							<Button type="button" className="btn btn-light p-0" onClick={ ()=> edStartHandle([movement.id]) }>
								<span className="far fa-edit"></span>
							</Button>
						</div>			
					</div>
	}
	return (res);
}
Comment.propTypes = {
	editingMovementsIds: PropTypes.array.isRequired,
	movement: PropTypes.object.isRequired,
	voc: PropTypes.object.isRequired,
}


export class CommentsBlock extends React.Component{
	constructor(props){
		super(props)
	}

	_handleMassMovAdd = (e)=>{
		readOshchad(e).then((oshchadMovements)=>{
			const newMovIds = this.props.voc.handleMassMovAdd(oshchadMovements, this.props.company.id)
		})
	}

	render(){
		const {company, movements, direction, voc, loadingMovementsIds, editingMovementsIds} = this.props
		const {edStartHandle, handleMovAdd, currsList, movsGroupsList} = this.props.voc

		const emptyMovVals = {
			company_id: company.id,
			day_id: 0,
			currency_id: currsList[0].id,
			currency: currsList[0].name_int,
			movement_group_id: movsGroupsList.filter(mg=>mg.direction==direction)[0].id,
			group_name: movsGroupsList.filter(mg=>mg.direction==direction)[0].name,
			account_id: 0,
			value: 0,
			direction: direction,
			is_changed: true,
		}

		const addButton = <div className="row justify-content-center">
						<div className="col-5 p-0">
							<Button type="button" className="btn btn-light p-0 my-vButton" onClick={()=>handleMovAdd(emptyMovVals)}>
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
									voc = {voc}
									loadingMovementsIds = {loadingMovementsIds}
									editingMovementsIds={editingMovementsIds}
								/> 
							)
						})
					}

				</div>
				<div className="container-fluid">
					{addButton}
				</div>
			</div>
		)
	}
}
CommentsBlock.propTypes = {
	movements: PropTypes.array.isRequired,
	direction: PropTypes.string.isRequired,
	company: PropTypes.object.isRequired,
	voc: PropTypes.shape({
		handleMassMovAdd: PropTypes.func.isRequired,
		handleMovAdd: PropTypes.func.isRequired,
		edStopHandle: PropTypes.func.isRequired,
		edStartHandle: PropTypes.func.isRequired,
		handleMovAdd: PropTypes.func.isRequired,
	}).isRequired,
	loadingMovementsIds: PropTypes.array.isRequired,
	editingMovementsIds: PropTypes.array.isRequired
}