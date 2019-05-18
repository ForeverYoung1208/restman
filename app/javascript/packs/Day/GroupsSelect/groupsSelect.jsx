import React from 'react'
import PropTypes from 'prop-types'

import { Input } from 'reactstrap'

export class GroupsSelect extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			groupsList: []
		}
	}

  componentDidMount = () => {
  	const getCompaniesUrl = '/groups.json'
		const myHeaders = new Headers({
			'Content-Type': 'application/json'
		});
    fetch( getCompaniesUrl,
			{
				method: 'GET',
				headers: myHeaders
			})
			.then( res => {
				return res.json()
			})
			.then( resj => {
				this.setState({groupsList: resj})
			}
		)
		$('#groups-select').on('change', (e) => {
				const id = e.target.value
				this.props.onGroupChanged(id, this.state.groupsList.filter(g => g.id ==id )[0].code_name_eng)
			}
		)

  }	

  render(){
  	return(
  		<div className="p-2">
  			<Input id="groups-select" type="select" defaultValue="0">
			    <option value="0" disabled>Please select</option>  			
  				
  				{this.state.groupsList.map( (g) => ( 
  						<option key={g.id} value={g.id}> {g.code_name_eng} </option>
  					)
 					)}
  				
  			</Input>
  		</div>

  	)
  }

}
GroupsSelect.propTypes = {
	onGroupChanged: PropTypes.func.isRequired
}