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
		this.getCompanies()
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
				console.log( resj )

				resj = resj.map( (r) => { 
					if(r.id == '1' ){
						return {id: r.id, code_name: r.code_name} 
					/// TODO: remove unneccesary elements here
				}

				})
				
				console.log( resj )

				this.setState({
					companiesList: [...resj],
					companiesSelected: resj.map( c => c.id)
				});
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


				<div className="col-md-3 flex-row d-flex align-items-center">
					<Datepicker onDateChanged={this.handleDateChanged} date={this.state.date} />
				</div>

				<div className="col-md-1 flex-row d-flex align-items-center">
	  			<span>Групувати по:</span>
				</div>

				<div className="col-md-2 flex-row d-flex align-items-center">
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