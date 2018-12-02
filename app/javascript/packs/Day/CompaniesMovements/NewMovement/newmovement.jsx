import React from "react"
import PropTypes from "prop-types"
import { Input } from 'reactstrap'
import { fetchJSONfrom } from '../../../i-services'


export class NewMovement extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currSId: 0,
			movsGroupSId: 0,
			accSId: 0,
			val: 0,
			alf:[],

		}
	}

	componentDidMount= () => {
		const {accsList, company_id} = this.props.voc
		const alf = accsList.filter((acc) => acc.company_id == company_id)
	  this.setState({alf: alf})
	}

	handleMovsGroupChange = (e) => {
	  this.setState({movsGroupSId: e.target.value })
	}

	handleCurrChange = (e) => {
		const {accsList, company_id} = this.props.voc
		const alf = accsList.filter((acc) => acc.company_id == company_id && acc.currency.id == e.target.value )
		console.log(accsList)

	  this.setState({
	  	currSId: e.target.value,
	  	alf: alf
	  })
	}

	handleAccChange = (e) => {
	  this.setState({accSId: e.target.value})
	}


	render(){
		const {movsGroupsList, currsList} = this.props.voc
		const {alf} = this.state
	
		return (
			<div>
				<div className="row">
					<Input type="text" className="col-md-3"
						onChange={ (e) => this.setState({val: e.target.value }) }
					/>

					<Input id="groups-select" type="select" className="col-md-3"
						defaultValue={this.state.currSId}
						onChange = {this.handleCurrChange}
					>
						<option value="0" disabled>Валюта</option>  			
						{currsList.map( (v) => ( <option key={v.id} value={v.id}> {v.name_int} </option>	))}
					</Input>


					<Input id="groups-select" type="select" className="col-md-3"
									defaultValue={this.state.movsGroupSId}
									onChange={this.handleMovsGroupChange}
					>
						<option value="0" disabled>Категорія</option>  			
						{movsGroupsList.map( (mg) => ( <option key={mg.id} value={mg.id}> {mg.name} </option>	))}
					</Input>
				</div>

				<div className="row">
					<Input id="groups-select" type="select" className="col-md-10"
									defaultValue={this.state.accsSId}
									onChange={this.handleAccChange}
					>
						<option value="0" disabled>Рахунок</option>  			
						{alf.map( (a) => ( <option key={a.id} value={a.id}> {a.number} </option>	))}
					</Input>
					
				</div>
				<div className="row">
					<Input type="textarea" name="text" className="col-md-10" 
						onChange={ (e) => this.setState({notes: e.target.value }) }
					/>
				</div>
			</div>
		)
	}
	
}

NewMovement.propTypes = {
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
		currency: PropTypes.string
	})
}
