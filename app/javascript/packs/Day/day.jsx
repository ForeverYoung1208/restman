import React from 'react'
import Moment from 'moment'
import PropTypes from 'prop-types'

import {Datepicker} from './Datepicker/datepicker'
import {CompaniesSelect} from './CompaniesSelect/companiesSelect'
import {GroupsSelect} from './GroupsSelect/groupsSelect'
import {CompaniesMovements} from './CompaniesMovements/companiesMovements'

const dashDateFormat = (date) =>{
	if(date){
		return (date.substring(6,10)+'-'+date.substring(3,5)+'-'+date.substring(0,2))
	}
}

const DayInfo = (props) => {
	if (!props.day){ return('no day here')	} 
	const {day} = props
	let is_open = ''	
	day.is_closed ? is_open = 'Ні' : is_open = 'Так'

  return(
  	<div>
  		<div> Відкритий?: {is_open}</div>
  		<div> id:{day.id}, {day.comment} </div>
  	</div>
  )
}
DayInfo.Proptypes={
	day: PropTypes.shape.isRequired
}


/////////////////////////////////////////////////////////////////////////////////////////////
export class Day extends React.Component {
	constructor(props){
		super(props)
	
		this.state = {
			date: this.getDateFromUrl(),	//Moment(Date.now()).format('DD.MM.YYYY'),
			day: null,
			companiesList: [],
			companiesSelected: [],
			group: null,
			allMovements: [],
			isMovsGrouped: false,
			cathegories:[]
		}
	}

  componentDidMount = () => {
  	this.getDay( this.state.date )
    this.getCompanies()
  }	

  getDateFromUrl = () => {
  	const t = window.location.href.substr(-10)
		return (t.substr(8,2)+'.'+t.substr(5,2)+'.'+t.substr(0,4))
  }


	getMovements = (dateDefault) => {
		let date = dateDefault
		this.props.date ? date = this.props.date : null
    fetch('/movements/by_date/'+dashDateFormat(date)+'.json',
			{	method: 'GET',
				headers: {'Content-Type': 'application/json'}
			}).then( res => {	return res.json()	}).then( resj => {
				this.setState({
					allMovements: [...resj]
				});
			}
		)	  
	}

	getCathegiries = () => {
    fetch('/movement_groups.json',
			{	method: 'GET',
				headers: {'Content-Type': 'application/json'}
			}).then( res => { return res.json() }).then( resj => {
				this.setState({
					cathegories: [...resj]
				});
				console.log(this.state)
			}
		)	  
	}

  getDay = ( date_string ) => {
    fetch( '/days/find.json?date='+date_string,
			{ method: 'GET',
				headers: {'Content-Type': 'application/json'}
			}).then( res => {	return res.json() }).then( resj => {
				if (resj.date){
					this.setState({	
						date: resj.date,
						day: resj
					});
					this.getMovements(resj.date)
					this.getCathegiries()
				}
			}
		)
  }

  getCompanies = () => {
		const group_id = this.state.group
    fetch('/companies.json',
			{
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			}).then( res => { return res.json()	}).then( resj => {
				resj = resj.filter( r => String(r.group_id) == String(group_id)  )
				this.setState({
					companiesList: [...resj],
					companiesSelected: [...resj]
				});
			}
		)
  }

	handleDateChanged = (newDate) => {
		this.getDay(newDate)

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

  handleMGroupClick = () => {
  	this.setState({isMovsGrouped: !this.state.isMovsGrouped})
  }




	render(){
		return (
			<div className="container-fluid">
				<div className="row">


					<div className="col-md-3 flex-row d-flex align-items-center">
						<Datepicker onDateChanged={this.handleDateChanged} date={this.state.date} />
						<DayInfo day={this.state.day} />
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
				{/* <div className="row">
									<hr className="my-hr-center col-md-10 align-center"/>
								</div>*/}

				<div className="row container-fluid col-md-12" >
						<CompaniesMovements 
							companies = {this.state.companiesSelected} 
							date={this.state.date}
							allMovements={this.state.allMovements}
							isGrouped = {this.state.isMovsGrouped}
							mGroupClick = {this.handleMGroupClick}
						/>
				</div>
			</div>
		)
	}
}
Day.Proptypes = {

}