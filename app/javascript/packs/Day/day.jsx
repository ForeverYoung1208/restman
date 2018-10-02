import React from 'react'
import Moment from 'moment'
import PropTypes from 'prop-types'

import {Datepicker} from './Datepicker/datepicker'
import {CompaniesSelect} from './CompaniesSelect/companiesSelect'
import {GroupsSelect} from './GroupsSelect/groupsSelect'
import {CompanyMovements} from './CompanyMovements/companyMovements'

export class Day extends React.Component {
	constructor(props){
		super(props)
		const date = Moment(Date.now()).format('DD.MM.YYYY')
	
		this.state = {
			date: Moment(Date.now()).format('DD.MM.YYYY'),
			day: null,
			companiesList: [],
			companiesSelected: [],
			group: null
		}
	}

  componentDidMount = () => {
  	this.getDate( this.state.date )
    this.getCompanies()
  }	

  getDate = ( date_string ) => {
    fetch( '/days/find.json?date='+date_string,
			{ method: 'GET',
				headers: {'Content-Type': 'application/json'}
			})
			.then( res => {
				return res.json()
			})
			.then( resj => {
				if (resj.date){
					this.setState({	
						date: resj.date,
						day: resj
					});
				}
			}
		)
    
  }

  getCompanies = () => {
  	const getCompaniesUrl = '/companies.json'
		const myHeaders = new Headers({
			'Content-Type': 'application/json'
		});
		const group_id = this.state.group
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
				resj = resj.filter( r => String(r.group_id) == String(group_id)  )
				this.setState({
					companiesList: [...resj],
					companiesSelected: [...resj]
				});
			}
		)
  }

	handleDateChanged = (newDate) => {
		this.getDate(newDate)
		// this.setState({date: newDate})

	}

	handleGroupChanged = (newGroup) => {
		this.setState({group: newGroup})
		this.getCompanies()
	}



  handleCompanyClick = (selected) => {
    const index = this.state.companiesSelected.indexOf(selected);
    if (index < 0) {
      this.state.companiesSelected.push(selected);
    } else {
      this.state.companiesSelected.splice(index, 1);
    }
    this.setState({ companiesSelected: [...this.state.companiesSelected.sort( (c1, c2 )=>(c1.id - c2.id) )] });
  }





	render(){
		return (
			<div className="container-fluid">
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
				<div className="row">
					<hr className="my-hr-center col-md-10 align-center"/>
				</div>

				<div className="row container-fluid col-md-12" >
						<CompanyMovements companies = {this.state.companiesSelected} date={this.state.date}/>
				</div>
			</div>
		)
	}
}
Day.Proptypes = {

}