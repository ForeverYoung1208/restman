import React from "react"
import PropTypes from "prop-types"
import { Input } from 'reactstrap'
import { fetchJSONfrom } from '../../../i-services'


export class NewMovement extends React.Component{

	render(){
		const {movsGroupsList, currsList, accsList, company_id} = this.props.voc
		return (
			<div>
				<div className="row">
					<input type="text" className="col-md-3"/>

					<Input id="groups-select" type="select" defaultValue="0"  className="col-md-3">
						<option value="0" disabled>Валюта</option>  			
						{currsList.map( (v) => ( <option key={v.id} value={v.id}> {v.name_int} </option>	))}
					</Input>


					<Input id="groups-select" type="select" defaultValue="0"  className="col-md-3">
						<option value="0" disabled>Категорія</option>  			
						{movsGroupsList.map( (mg) => ( <option key={mg.id} value={mg.id}> {mg.name} </option>	))}
					</Input>
				</div>
				<div className="row">
					<Input type="textarea" name="text" className="col-md-10"/>
				</div>
			</div>
		)
	}
	
}

NewMovement.propTypes = {
	voc: PropTypes.object.isRequired,
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
