import React from "react"
import PropTypes from "prop-types"
import { Input, Button } from 'reactstrap'
import { fetchJSONfrom } from '../../../i-services'
import { UNUSED_ACCOUNTS_IDS } from '../../../constants';


export class EditMovement extends React.Component{
	constructor(props){
		super(props);
		const m = this.props.defMovVals   // 		defMovVals is required
		this.state = {
			alf:[], 				//accs List filtered
			is_changed: m.is_changed,
			m: {...m, group_id:m.movement_group_id} 						//current movement being editted,  double movement_group_id as "group_id" to create movement parameter to send it to understandable rails model parameter
		}
	}

	componentDidMount= () => {
		const {accsList} = this.props.voc
		// const {company} = this.props

		// console.log(accsList);
		const alf = accsList.filter((acc) => acc.company_id == this.state.m.company_id && !UNUSED_ACCOUNTS_IDS.includes( +acc.acc_type_id ))
	  this.setState({
	  	alf: alf, 
	  	// is_changed: false,
	 	})
	}

	handleValueChange = (e) => {
	  this.setState({
	  	m: {...this.state.m, value: e.target.value}, 
	  	is_changed: true  
	  })
	}

	handleMovsGroupChange = (e) => {
	  this.setState({
	  	m: {...this.state.m, movement_group_id: e.target.value, group_id: e.target.value},  // double movement_group_id as "group_id" to create movement parameter to send it to understandable rails model parameter
	  	is_changed: true  
	  })
	}

	handleAccChange = (e) => {
	  this.setState({
			m:{...this.state.m, account_id: e.target.value},
	  	is_changed: true,
	  })
	}

	handleCommentChange = (e) => {
	  this.setState({
			m:{...this.state.m, comment: e.target.value},
	  	is_changed: true,
	  })
	}


	render(){
		const {movsGroupsList, currsList, handleMovSave, handleMovDelete, edStopHandle } = this.props.voc
		const {alf, m, is_changed} = this.state
	
		return (
			<div className = "container-fluid p-0">
				<div className="row">
					<Input type="text" className="col-md-4"
						defaultValue = {m.value}
						onChange={ this.handleValueChange }
					/>


					<Input id="groups-select" type="select" className="col-md-6"
									value={m.movement_group_id}
									onChange={this.handleMovsGroupChange}
					>
						<option value="0" disabled>Категорія</option>  			
						{movsGroupsList.filter(mg=> mg.direction==m.direction)
							.map( (mg) => ( <option key={mg.id} value={mg.id}> {mg.name} </option>	))}
					</Input>

					<Button className='btn-warning col-md-1 p-0 m-0'
						onClick = {() => handleMovDelete(m)}>
						<span className='fa fa-trash'></span>						
					</Button>



				</div>
				<div className="row">
					<div className="col-md-11">
						<div className="row">

							<Input id="accounts-select" type="select" className="col-md-12"
											value={m.account_id}
											onChange={this.handleAccChange}
							>
								<option value="0" disabled>Рахунок</option>  			
								{alf.map( (a) => ( <option key={a.id} value={a.id}> {a.number} </option>	))}
							</Input>
							
						</div>
						<div className="row">
							<Input type="textarea" name="text" className="col-md-12" 
								defaultValue={m.comment}
								onChange={ this.handleCommentChange }
							/>
						</div>
					</div>
					<div className="col-md-1 p-0">
						<Button type="button" className={`btn ${is_changed ? 'btn-warning' : 'btn-light' } my-vButton p-0`}
							onClick = {()=> is_changed ? handleMovSave(m) : edStopHandle([m.id])}
						>
							<span className={`fa ${is_changed ? 'fa-save' : 'fa-angle-up' }`}></span>
						</Button>
					</div>



				</div>


			</div>
		)
	}
	
}

EditMovement.propTypes = {
	voc: PropTypes.shape({
		handleMovSave: PropTypes.func.isRequired,
		handleMovDelete: PropTypes.func.isRequired,
		edStopHandle: PropTypes.func.isRequired,
	}).isRequired,

	defMovVals: PropTypes.shape({
		account_id: PropTypes.number,
		comment: PropTypes.string,
		company_id: PropTypes.number.isRequired,
		created_at: PropTypes.string,
		day_id: PropTypes.number.isRequired,
		deleted_at: PropTypes.string,
		direction: PropTypes.string.isRequired,
		movement_group_id: PropTypes.number.isRequired,
		id: PropTypes.number,
		last_editor_id: PropTypes.number,
		log: PropTypes.string,
		updated_at: PropTypes.string,
		value: PropTypes.number,
		is_changed: PropTypes.boolean
		// currency: PropTypes.string,
		// currency_id: PropTypes.number,
	}).isRequired
}


