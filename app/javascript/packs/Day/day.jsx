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
			groupsList: [],
			group: null
		}
	}

	datepickerChanged = (newDate) => {
		this.setState({date: newDate})
	}

	groupChanged = (newGroup) => {
		this.setState ({group: newGroup})	  
	}


	render(){
		return (
			<div className="row">


				<div className="col-md-3">
					<Datepicker dateChanged={this.datepickerChanged} date={this.state.date} />
				</div>
				<div className="col-md-3">
					<GroupsSelect groupChanged={this.groupSelectChanged}/>
					<CompaniesSelect />
				</div>

				<div className="col-md-3 flex-row d-flex align-items-center">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed provident eum, libero fuga rerum deleniti. Quos, illum, veritatis. Odit iusto, possimus non, ex soluta ad magnam animi illum vitae at.
					Molestias, explicabo est recusandae non facilis quae aperiam, sit error deserunt ad fugit dolores tempora, id ea eum. Voluptatum hic vero perspiciatis laboriosam minima odio accusantium nostrum ea, unde et.</p>
				</div>
			</div>
		)
	}
}
Day.Proptypes = {

}