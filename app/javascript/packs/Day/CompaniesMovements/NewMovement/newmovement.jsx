import React from "react"
import PropTypes from "prop-types"
import { Input } from 'reactstrap'
import { fetchJSONfrom } from '../../../i-services'


export default class NewCompany extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			mGroupsList: [],
			valList:[],
		}
	}


	componentDidMount =  () => {
	  Promise.all( [fetchJSONfrom('/currencies.json'), fetchJSONfrom('/movement_groups.json')] )
	  .then( (res) =>{
	  	let [vl, gl] = res
		  console.log( {gl, vl} )

		  this.setState({
		  	mGroupsList: gl,
		  	valList:vl
		  })

	  })
	}

	render(){
		const {mGroupsList, valList} = this.state
		return (
			<div className="row">
				<input type="text" className="col-md-3"/>

				<Input id="groups-select" type="select" defaultValue="0"  className="col-md-3">
					<option value="0" disabled>Валюта</option>  			
					{valList.map( (v) => ( <option key={v.id} value={v.id}> {v.name_int} </option>	))}
				</Input>


				<Input id="groups-select" type="select" defaultValue="0"  className="col-md-3">
					<option value="0" disabled>Категорія</option>  			
					{mGroupsList.map( (mg) => ( <option key={mg.id} value={mg.id}> {mg.name} </option>	))}
				</Input>


			</div>
		)
	}
	
}
NewCompany.propTypes = {

}
