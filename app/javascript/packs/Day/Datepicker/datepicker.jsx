import React from 'react'
import PropTypes from 'prop-types'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const DateChangeConfirm = (props) => {
	return(
		<Modal isOpen={props.is_shown} toggle={props.toggle}>
			<ModalHeader toggle={props.toggle}>Are You sure?</ModalHeader>
			<ModalBody>
					The working date will be changed!!
			</ModalBody>
			<ModalFooter>
					<Button color="primary" onClick={props.onOk}>Ok</Button>{' '}
					<Button color="secondary" onClick={props.onCancel}>Cancel</Button>
			</ModalFooter>
		</Modal>
	)
}
DateChangeConfirm.propTypes = {
	is_shown: PropTypes.bool.isRequired,
	toggle: PropTypes.func.isRequired,
	onOk: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired
}




export class Datepicker extends React.Component {
	constructor(props){
		super(props)
		this.state = { 
			new_date: null,
			modal_shown: false
		}
	}

	toggleModal = (new_date) => {
			this.setState({
					new_date: new_date,
					modal_shown: !this.state.modal_shown
			});
	}	

	handleChange = (e) => {
		// console.log('this event from datapicker passed through the jquery.on("change")' + e.target)
	}


	okHandler = () => {
		this.props.onDateChanged(this.state.new_date)	  
		this.toggleModal()

	}

	cancelHandler = () => {
		this.toggleModal()
	}

	componentDidMount = () =>{
		$('.date').datepicker({
			language: 'ua',
			format: "dd.mm.yyyy",
			todayBtn: true,
			autoclose: true,
		}).on('change', (e) => {
				this.toggleModal(e.target.value)
			}
		)
	}


	render(){

		return (
			<div className="flex-row d-flex align-items-center">
				<div className="d-flex align-items-center">

					<span>Дата: </span>
					<div className="input-group date day-date-picker p-2">
						<input
							// data-provide="datepicker"
							className="form-control"
							aria-describedby="picker-icon1" 
							onChange={this.handleChange} 
							value={this.props.date}
						/>
						<div className="input-group-append input-group-addon">
							<span className=" input-group-text" id="picker-icon1"><span className="fa fa-th"></span></span>
						</div>
					</div>	
					<DateChangeConfirm 
						is_shown={this.state.modal_shown} 
						toggle={this.toggleModal}
						onOk={this.okHandler}
						onCancel={this.cancelHandler}
						new_date={this.state.new_date}
					/>


				</div>
			</div>

		)
	}
}
Datepicker.propTypes = {
	onDateChanged: PropTypes.func,
	date: PropTypes.string
}
