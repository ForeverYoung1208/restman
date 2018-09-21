import React from 'react'
import Moment from 'moment'
import PropTypes from 'prop-types'

import {Datepicker} from './Datepicker/datepicker'
import {CompaniesSelect} from './CompaniesSelect/companiesSelect'
import {GroupsSelect} from './GroupsSelect/groupsSelect'

export class Day extends React.Component {
	constructor(props){
		super(props)
	
		this.state = {
			date: Moment(Date.now()).format('DD.MM.YYYY'),
			companiesList: [],
			companiesSelected: [],
			group: null
		}
	}

	handleDateChanged = (newDate) => {
		this.setState({date: newDate})
	}

	handleGroupChanged = (newGroup) => {
		this.setState ({group: newGroup})	  
		console.log(this.state.group)
	}


	render(){
		return (
			<div className="row">


				<div className="col-md-3">
					<Datepicker onDateChanged={this.handleDateChanged} date={this.state.date} />
				</div>

				<div className="col-md-1">
	  			<span>Групувати по:</span>
				</div>

				<div className="col-md-2">
					<GroupsSelect onGroupChanged={this.handleGroupChanged}/>
				</div>

				<div className="col-md-3 flex-row d-flex align-items-center">
					<span>Lorem ipsum dolor</span>
				</div>
			</div>
		)
	}
}
Day.Proptypes = {

}