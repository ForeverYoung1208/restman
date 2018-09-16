import React from 'react'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css'

export class Datepicker extends React.Component {
	constructor(props){
		super(props)
	}


	handleChange = (e) => {
		console.log(e.target)
		this.props.dateChanged(e.target.value)
	}

	componentDidMount = () =>{
		// $('.date').datepicker({
		// 	language: 'ua',
		// 	format: "dd.mm.yyyy",
		// 	todayBtn: true,
		// 	autoclose: true,
		// })	
	}




	render(){
		return (
			
			<div className="flex-row d-flex align-items-center">
				<div className="d-flex align-items-center">
					<span>Дата: </span>

					<DayPicker />




					<div className="input-group date day-date-picker p-2">
						<input 
							className="form-control"
						  aria-describedby="picker-icon1" 
							onChange={this.handleChange} 
							value={this.props.date}
						/>
				    <div className="input-group-append input-group-addon">
						  <span className=" input-group-text" id="picker-icon1" ><span className="fa fa-th"></span></span>
					  </div>
					</div>	



				</div>
				<div className="p-2 bd-highlight"> {this.props.date} </div>
			</div>

		)
	}





}