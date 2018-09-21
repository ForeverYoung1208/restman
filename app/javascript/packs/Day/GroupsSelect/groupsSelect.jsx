import React from 'react'
import PropTypes from 'prop-types'

import { Input } from 'reactstrap'

export class GroupsSelect extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			groupsList: [],
			dropdownOpen: false
		}
	}

	toggle = () => {
	  this.setState(	{ dropdownOpen: !this.state.dropdownOpen} )
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
				// body: JSON.stringify(payload),
				// credentials: "same-origin"
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
  		<div className="flex-row d-flex align-items-center p-2" >
  			<Input id="groups-select" type="select">
  				
  				{this.state.groupsList.map( (g) => ( 
  						<option id={g.id} key={g.id}> {g.code_name_eng} </option>
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