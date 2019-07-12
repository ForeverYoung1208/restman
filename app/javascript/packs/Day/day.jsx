import React from 'react'
import Moment from 'moment'
import PropTypes from 'prop-types'
// import axios from 'axios'

import {Datepicker} from './Datepicker/datepicker'
import {CompaniesSelect} from './CompaniesSelect/companiesSelect'
import {GroupsSelect} from './GroupsSelect/groupsSelect'
import {CompaniesMovements} from './CompaniesMovements/companiesMovements'
import {Button} from "reactstrap"

import {fetchJSONfrom, postDataAsJSON, dashDateFormat, getSafe} from '../i-services'


const DayInfo = (props) => {
	if (!props.day){ return('no day here')	} 
	const {day, user} = props

	let is_open = ''	
	day.is_closed ? is_open = 'Ні' : is_open = 'Так'

	return(
		<div>
			<div> id:{day.id}, відкритий?: {is_open}</div>
			<div> {day.comment} 
				{ !day.is_closed&&user.roles&&(user.roles.includes('can_close_day')||user.roles.includes('admin' ))
						? <Button className="p-0 btn-warning" onClick={props.closeDay}>Закрити</Button> 
						: ''
				}
			</div>
		</div>
	)
}
DayInfo.Proptypes={
	day: PropTypes.shape.isRequired
}

////  Let's try to 'useContext' hook to spread 'voc' over the code/
////  That's new feature so it'll be used only at some new parts of code.
////  the rest of the code will rely on passing 'voc' through the params.
export const VocContext = React.createContext();
////


/////////////////////////////////////////////////////////////////////////////////////////////
export class Day extends React.Component {
	constructor(props){
		super(props)
		this.lastNewMovId = -10 //new ids for new movements being added. Counter goes downwars. From -1..-9 ids reserved for special Technical movemets
		this.exportBuffer = []
		this.state = {
			date: this.getDateFromUrl(),	//Moment(Date.now()).format('DD.MM.YYYY'),
			day: null,
			companiesSelected: [],
			group: null,
			companyGroupName:'',
			allMovements: [],
			loadingMovementsIds: [],
			editingMovementsIds: [],
			isMovsGrouped: false,
			voc:{
					currentUser:{},
					compList: [],
					movsGroupsList: [],
					currsList:[],
			  	accsList:[],
			  	handleMovSave: this.handleMovSaving,
			  	handleMovDelete: this.handleMovDelete,
			  	handleMovAdd: this.handleMovAdd,
			  	handleMassMovAdd: this.handleMassMovAdd,
					edStopHandle: this.edStopHandle,
					edStartHandle: this.edStartHandle,
					banksOfAccounts: this.banksOfAccounts,
					getNewMovId: this.getNewMovId,
					handleMovsSign: this.handleMovsSign,
					handleNullMovsSign: this.handleNullMovsSign,
					addToExportBufer: this.addToExportBufer,
					readExportBuffer: this.readExportBuffer,
					clearExportBuffer: this.clearExportBuffer,
					isDayClosed: () => this.state.day.is_closed
				}
		}
	}

	closeDay = () => {
		const {day} = this.state
		day.is_closed = true
		console.log(day)
		if (confirm('Close Day?')){
			postDataAsJSON(`/days/${day.id}.json`,'PUT', day,
				(res)=>{
					console.log('day closed': res)
					this.setState({...this.state, day})
				},
				(err)=>console.log('err': err)
			)

		}
	}

	banksOfAccounts = (accounts=this.state.voc.accsList) =>{
		const banks = accounts.map( (a,ind,arr) => arr.indexOf(a)==ind ? a.bank : null)
		// remove duplicate banks
		// that was good for plain array of simple strings:
		// const uniqBanks = [...new Set(banksSelected)];
		// but we have the array of objects and we have compare them on 'id' property:
		let uniqBanks = []
		banks.forEach( (bs) => {
			uniqBanks.find(ub => bs.id == ub.id) ? null : uniqBanks.push(bs)
		})
		uniqBanks.push({
			id: 'total',
			name: 'Всі'
		})
		return uniqBanks
	}

	addToExportBufer = (company,key, value)=>{
		let index = this.exportBuffer.findIndex((record)=>record.company_id==company.id)
		if (index>=0){ 
			this.exportBuffer[index][key]=value
		}else{
			this.exportBuffer.push({
				company_id:company.id,
				companyCodeName:company.code_name,
				[key]: value
			})			
		}
		return value

	}

	clearExportBuffer = () => {
		this.exportBuffer = []
	}

	readExportBuffer = () => {
		return this.exportBuffer
	}

	handleNullMovsSign = (company) => {
		const {day} = this.state
		const {movsGroupsList, currsList, accsList } = this.state.voc

		try{
			const technicalMovement = {
				id:-1,
				company_id: company.id,
				day_id: day.id,
				// currency_id: currsList[0].id,
				// currency: currsList[0].name_int,
				movement_group_id: movsGroupsList[0].id,
				group_id: movsGroupsList[0].id,
				account_id: accsList.filter(a=>a.company_id == company.id)[0].id,
				value: 0,
				direction: 'Technical',
				is_changed: true,
				log: `${company.code_name}: signed no movements`,
				signed_now: true,
			}
			this.handleMovSaving(technicalMovement)
		}	catch (e){
			alert(`Не можу зберегти інформацію якщо у компанії немає жодного рухунку. У налаштуваннях рахунків додайте хоча б один рахунок цій компанії.`)
		}

	}

	handleMovsSign = (movs, log) => {
		movs.forEach(mov => this.handleMovSaving({...mov, log, signed_now:true}))
	
		// axios.get('/currencies.json').then( res=> console.log(res))
		// console.log(
		// 	{
		// 		'implement movement signing here':movs,
		// 		'log':log,
		// 	}
		// )
	}

	getNewMovId = () => {
		this.lastNewMovId -=1
		return this.lastNewMovId
	}


	handleMassMovAdd = (oshchMovs,company_id) => {
		const newMovs=[];
		let direction;
		// let newId = -2;

		['allDebit','allCredit'].forEach((dc) =>
		  oshchMovs[dc].forEach((mov)=>{
		  	direction = dc=='allDebit' ? "Income" : "Outcome"
		  	newMovs.push({
		  		account_id: this.state.voc.accsList.filter(acc=>acc.company_id==company_id&&acc.is_default==true)[0].id,
		  		myAccNumber: oshchMovs.myAccNumber,
		  		comment: `${mov.data.info} (${mov.data.agent})`,
		  		company_id: company_id,
		  		currency_id: this.state.voc.currsList[0].id,
		  		currency: this.state.voc.currsList[0].name_int,
		  		day_id: this.state.day.id,
		  		direction: dc=='allDebit' ? "Income" : "Outcome",
		  		id: this.getNewMovId(),
		  		log:null,
		  		movement_group_id: this.state.voc.movsGroupsList.filter(mg=>mg.direction==direction)[0].id,
		  		value: Math.round(mov.data.sum), 
		  		is_changed: true, 
		  	})
		  })
	  )
		this.setState((prevState)=>({
			allMovements: [...prevState.allMovements, ...newMovs],

		}))
  	// console.log(newMovs)
  	return newMovs.map(nm=>nm.id)
	}

// oshchMov structure:
// addr: "AJ20"
// agent: "ПРАТ "ОБ'ЄДНАННЯ МІЖРАЙПОСТАЧ""
// agentEdrpou: "00906166"
// date: "29.12.2018"
// info: "За послуги з-но акта   в т.ч. ПДВ 20% - 666.67 грн."
// number: "57"
// sum: 4000

//movement structure;
// account_id: 5
// comment: "teeest100"
// company_id: 3
// created_at: "2019-01-08T11:12:13.000Z"
// currency: "UAH"
// currency_id: 1
// currency_ukr: "грн."
// day_id: 14
// deleted_at: null
// direction: "Income"
// group_name: "Депозитарные доходы"
// id: 5
// last_editor_id: 5
// log: null
// movement_group_id: 1
// updated_at: "2019-01-08T11:12:13.000Z"
// value: 100


	edStopHandle = (idsToStop) => {
		this.setState((prevState)=>({
			editingMovementsIds: [...prevState.editingMovementsIds.filter(id=>!idsToStop.includes(id))],
		}))
	}

	edStartHandle = (idsToStart) => {
		this.setState((prevState)=>({
			editingMovementsIds: [...prevState.editingMovementsIds, ...idsToStart],
		}))
	}

	handleMovAdd= (newMov) => {
		newMov.id = this.getNewMovId()
		this.setState((prevState)=>({
			allMovements: [...prevState.allMovements, newMov],
			editingMovementsIds: [...prevState.editingMovementsIds, newMov.id],
		}))
	}

	
	handleMovSaving = (m) => {
		m.day_id = this.state.day.id
		console.log( m )
		if(	(m.account_id>0 ||m.direction=="Technical") 
				&&	m.company_id > 0 
				&&	m.movement_group_id > 0 
				&& m.day_id >0	
			){
			this.setState({loadingMovementsIds: [...this.state.loadingMovementsIds, m.id]})
			console.log('---saving movement ----')
			let url, httpMethod
			let tempId = m.id

			if (m.id <= 0 ){
				url = '/movements.json'
				httpMethod = 'POST'
				m.id = null
			}else{
				url = `/movements/${m.id}.json`
				httpMethod = 'PUT'
			}
			postDataAsJSON(url, httpMethod, m, 
				(response)=>{ 
					if (!response.ok) {
						this.setState({loadingMovementsIds: this.state.loadingMovementsIds.filter(id => (id!=m.id&&id!=-1))})
						alert('error saving to database: '+response.status+ '-'+response.statusText)
					} else {
						console.log('ok')
						response.json().then( (result) => {
							result.value = parseFloat(result.value)
							let newAllMovements

							//replace old mov with saved if it was PUT (update) process or create new if it was POST (create) (and remove temporary movement)
							m.id ? newAllMovements = this.state.allMovements.map(	mOld => (mOld.id != result.id ? mOld : result))
							   :	newAllMovements = [...this.state.allMovements.filter(mov=>mov.id!=tempId), result]
							
							this.setState({
								loadingMovementsIds: this.state.loadingMovementsIds.filter(id => (id!=m.id&&id>0)),
								editingMovementsIds: this.state.editingMovementsIds.filter(id => id!=m.id),
								allMovements: newAllMovements,
							})
						})
					}
				},
				(err)=>{
					alert('error connecting server') 
					console.log(err)
					this.setState({loadingMovementsIds: this.state.loadingMovementsIds.filter(id => (id!=m.id&&id>0))})
				}
			)
		} else{
			alert(`${m.day_id>0 ? '':'день'} ${m.company_id>0 ? '':'компанія'} ${m.account_id>0 ? '':'рахунок ' } ${m.movement_group_id>0 ? '': 'категорія платежів '}мають бути обрані!`)
		}
	}

	handleMovDelete = (m) => {
	  if (confirm('Дісно видалити?')){
	  	console.log({'deleting': m})

			postDataAsJSON(`/movements/${m.id}.json`, 'DELETE', {}, 
				(response)=>{ 
					if (!response.ok) {
						this.setState({loadingMovementsIds: this.state.loadingMovementsIds.filter(id => (id!=m.id&&id!=-1))})
						alert('error saving to database: '+response.status+ '-'+response.statusText)
					} else {
						console.log({'ok-deleted':this.state.allMovements.filter(id => id != m.id)})

						this.setState(prevState => ({
							allMovements: prevState.allMovements.filter(mov => mov.id != m.id)
						}))
					}
				},
				(err)=>{
					alert('error connecting server') 
					console.log(err)
					this.setState({loadingMovementsIds: this.state.loadingMovementsIds.filter(id => (id!=m.id&&id!=-1))})
				}
			)
	  }
	}



	componentDidMount = () => {
		this.getDay( this.state.date )
		this.getCompanies()
		this.getVoc()
	}	


	getVoc = () => {
	  Promise.all( [
	  	fetchJSONfrom('/currencies.json'), 
	  	fetchJSONfrom('/movement_groups.json'),
	  	fetchJSONfrom('/users/current.json'),
	  ] )
	  .then( (res) =>{
	  	let [cl, gl, user] = res
			this.setState((prevState)=>({
				voc: {
					...prevState.voc,
			  	movsGroupsList: gl,
			  	currsList:cl,
			  	currentUser:user,
				}
			}));		  
	  })	  
	}

	getDateFromUrl = () => {
		const t = window.location.href.substr(-10)
		return (t.substr(8,2)+'.'+t.substr(5,2)+'.'+t.substr(0,4))
	}


	getMovements = (dateDefault) => {
		let date = dateDefault
		this.props.date ? date = this.props.date : null

		Promise.all([
				fetchJSONfrom('/movements/by_date/'+dashDateFormat(date)+'.json'),
				fetchJSONfrom('/accounts/on_date/'+dashDateFormat(date)+'.json')
			])
			.then( (res) => {
			let [movements, accounts ] = res
			movements = movements.map( (r)=> ({...r, value: parseFloat(r.value)}) )
			this.setState((prevState)=>({
				allMovements: [...movements],
				voc: {...prevState.voc, accsList: accounts} 
			}));
		})	  
	}

	getDay = ( date_string ) => {
		fetchJSONfrom( '/days/find.json?date='+date_string).then( resj => {
				if (resj.date){
					this.setState({	
						date: resj.date,
						day: resj
					});
					this.getMovements(resj.date)
				}
			}
		)
	}

	getCompanies = () => {
		const group_id = this.state.group
		fetchJSONfrom('/companies.json').then( resj => {
			resj = resj.filter( r => String(r.group_id) == String(group_id)  )
			this.setState((prevState) => ({
				voc: {
					...prevState.voc,
					compList: [...resj]
				},
				companiesSelected: [...resj]
			}));
		})

	}

	handleDateChanged = (newDate) => {
		this.getDay(newDate)

	}

	handleGroupChanged = (newGroup, gName) => {
		this.setState({group: newGroup, companyGroupName: gName})
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
						<DayInfo day={this.state.day} closeDay = {this.closeDay} user={this.state.voc.currentUser}/>

					</div>

					<div className="col-md-1 flex-row d-flex align-items-center">
						<span>Групувати по:</span>
					</div>

					<div className="col-md-2 flex-row d-flex align-items-center">
						<GroupsSelect onGroupChanged={this.handleGroupChanged}/>
					</div>

					<div className="col-md-3 flex-row d-flex align-items-center">
						<CompaniesSelect
							voc = {this.state.voc}
							cSelected = {this.state.companiesSelected}
							onCompanyClick = {this.handleCompanyClick}
						/>
					</div>
				</div>


				<div className="row container-fluid col-md-12" >
					<VocContext.Provider value={this.state.voc}>
{/*
////  Let's try to 'useContext' hook to spread 'voc' over the code/
////  That's new feature so it'll be used only at some new parts of code.
////  the rest of the code will rely on passing 'voc' through the params.					
*/}

						<CompaniesMovements 
							companies = {this.state.companiesSelected} 
							date={this.state.date}
							allMovements={this.state.allMovements}
							isGrouped = {this.state.isMovsGrouped}
							companyGroupName = {this.state.companyGroupName}
							mGroupClick = {this.handleMGroupClick}
							voc = {this.state.voc}
							loadingMovementsIds = {this.state.loadingMovementsIds}
							editingMovementsIds = {this.state.editingMovementsIds}
						/>
					</VocContext.Provider>


				</div>
			</div>
		)
	}
}
