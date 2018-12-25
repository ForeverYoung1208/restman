import React from "react"
import PropTypes from "prop-types"
import { Input, Button } from 'reactstrap'
import { fetchJSONfrom } from '../../../i-services'


export class EditMovement extends React.Component{
	constructor(props){
		super(props);
		let m = {};
		if (props.defMovVals) {
			m = this.props.defMovVals
		} else {
			m = { currency_id: 0, group_id: 0, account_id: 0, value: 0, comment: ''}
		}

		this.state = {
			alf:[], 				//accs List filtered
			is_changed: false,
			m: m 						//current movement being editted
		}
	}

	componentDidMount= () => {
		const {accsList, company_id} = this.props.voc
		const alf = accsList.filter((acc) => acc.company_id == company_id)
	  this.setState({
	  	alf: alf, 
	  	is_changed: false,
	 	})
	}

	handleMovsGroupChange = (e) => {
	  this.setState({
	  	m: {...this.state.m, group_id: e.target.value}, 
	  	is_changed: true  
	  })
	}

	handleCurrChange = (e) => {
		const {accsList, company_id} = this.props.voc
		const alf = accsList.filter((acc) => acc.company_id == company_id && acc.currency.id == e.target.value )
	  this.setState({
			m:{...this.state.m, currency_id: e.target.value},
	  	alf: alf, 
	  	is_changed: true,
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
		const {movsGroupsList, currsList} = this.props.voc
		const {alf} = this.state
	
		return (
			<div className = "container-fluid p-0">
				<div className="row">
					<Input type="text" className="col-md-4"
						defaultValue = {this.state.m.value}
						onChange={ (e) => this.setState({val: e.target.value, is_changed: true }) }
					/>

					<Input id="groups-select" type="select" className="col-md-4"
						defaultValue={this.state.m.currency_id}
						onChange = {this.handleCurrChange}
					>
						<option value="0" disabled>Валюта</option>  			
						{currsList.map( (v) => ( <option key={v.id} value={v.id}> {v.name_int} </option>	))}
					</Input>


					<Input id="groups-select" type="select" className="col-md-4"
									defaultValue={this.state.m.group_id}
									onChange={this.handleMovsGroupChange}
					>
						<option value="0" disabled>Категорія</option>  			
						{movsGroupsList.map( (mg) => ( <option key={mg.id} value={mg.id}> {mg.name} </option>	))}
					</Input>
				</div>
				<div className="row">
					<div className="col-md-11">
						<div className="row">
							<Input id="groups-select" type="select" className="col-md-12"
											defaultValue={this.state.m.account_id}
											onChange={this.handleAccChange}
							>
								<option value="0" disabled>Рахунок</option>  			
								{alf.map( (a) => ( <option key={a.id} value={a.id}> {a.number} </option>	))}
							</Input>
							
						</div>
						<div className="row">
							<Input type="textarea" name="text" className="col-md-12" 
								defaultValue={this.state.m.comment}
								onChange={ this.handleCommentChange }
							/>
						</div>
					</div>
					<div className="col-md-1 p-0">
						<Button type="button" className={`btn ${this.state.is_changed ? 'btn-warning' : 'btn-light' } my-vButton p-0`}>
							<span className="far fa-save"></span>
						</Button>
					</div>



				</div>


			</div>
		)
	}
	
}

EditMovement.propTypes = {
	voc: PropTypes.object.isRequired, // + company_id from OneCompany
	defMovVals: PropTypes.shape({
		account_id: PropTypes.number,
		comment: PropTypes.string,
		company_id: PropTypes.number.isRequired,
		created_at: PropTypes.string,
		day_id: PropTypes.number.isRequired,
		deleted_at: PropTypes.string,
		direction: PropTypes.string.isRequired,
		group_id: PropTypes.number,
		id: PropTypes.number,
		last_editor_id: PropTypes.number,
		log: PropTypes.string,
		updated_at: PropTypes.string,
		value: PropTypes.number,
		currency: PropTypes.string,
		currency_id: PropTypes.number
	})
}


