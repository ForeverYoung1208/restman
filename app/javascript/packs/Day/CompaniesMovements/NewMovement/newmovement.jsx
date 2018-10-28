import React from "react"
import PropTypes from "prop-types"
import { Input } from 'reactstrap'

export default class NewCompany extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			mGroupsList: [],
			valList:[],
		}
	}

	render(){
		const {mGroupsList} = this.state
		return (
			<div className="row">
				<input type="text" className="col-md-3"/>
				
				<Input id="groups-select" type="select" defaultValue="0"  className="col-md-3">
					<option value="0" disabled>Додати</option>  			
					{mGroupsList.map( (g) => ( <option key={mg.id} value={mg.id}> {mg.name} </option>	))}
				</Input>


				<Input id="groups-select" type="select" defaultValue="0"  className="col-md-3">
					<option value="0" disabled>Додати</option>  			
					{mGroupsList.map( (g) => ( <option key={mg.id} value={mg.id}> {mg.name} </option>	))}
				</Input>


			</div>
		)
	}
	
}
NewCompany.propTypes = {

}
