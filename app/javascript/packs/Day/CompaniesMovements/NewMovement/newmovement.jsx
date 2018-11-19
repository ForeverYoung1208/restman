import React from "react"
import PropTypes from "prop-types"
import { Input } from 'reactstrap'
import { fetchJSONfrom } from '../../../i-services'


export default class NewCompany extends React.Component{

	render(){
		const {movsGroupsList, currsList} = this.props.voc
		return (
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
		)
	}
	
}
NewCompany.propTypes = {
	voc: PropTypes.object.isRequired

}
