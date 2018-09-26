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
				this.props.onGroupChanged(e.target.value)
			}
		)

  }	

  render(){
  	return(
  		<div className="p-2">
  			<Input id="groups-select" type="select">
			    <option defaultValue="" selected disabled>Please select</option>  			
  				
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
	onGroupChanged: PropTypes.func
}