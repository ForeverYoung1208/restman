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
		this.getCompanies()
		this.setState ({group: newGroup})
		console.log(this.state.group)
	}


  getCompanies = () => {
  	const getCompaniesUrl = '/companies.json'
		const myHeaders = new Headers({
			'Content-Type': 'application/json'
		});

    fetch(
			getCompaniesUrl,
			{
				method: 'GET',
				headers: myHeaders
			})
			.then( res => {
				return res.json()
			})
			.then( resj => {
				this.setState({
					companiesList: [...resj],
					companiesSelected: [...resj]
				})
			}
		)
  }

  handleCompanyClick = (selected) => {
    const index = this.state.companiesSelected.indexOf(selected);
    if (index < 0) {
      this.state.companiesSelected.push(selected);
    } else {
      this.state.companiesSelected.splice(index, 1);
    }
    this.setState({ companiesSelected: [...this.state.companiesSelected] });
  }


  componentDidMount = () => {
    this.getCompanies()
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
					<CompaniesSelect 
						companiesList = {this.state.companiesList} 
						cSelected = {this.state.companiesSelected}
						onCompanyClick = {this.handleCompanyClick}
					/>
				</div>
			</div>
		)
	}
}
Day.Proptypes = {

}