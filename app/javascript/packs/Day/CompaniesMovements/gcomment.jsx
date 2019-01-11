import React from "react"
import PropTypes from "prop-types"



export default class Gcomment extends React.Component {
	constructor(props){
		super(props)
	}

	
	// let res = (id:{movement.id}) {movement.value} {movement.currency_ukr} - {movement.group_name} ({movement.comment})

	render(){
		const {movements} = this.props
		let [uah, usd, eur] = [0, 0, 0]

		movements.forEach( (m) =>{

			switch (m.currency){
				case 'UAH':{
					uah += m.value

					break;
				}
				case 'USD':{
					usd += m.value
					break;
				}
				case 'EUR':{
					eur += m.value
					break;
				}

			}

		})



		return (
			<div>
				<div> uah:{uah}</div>
				<div> usd:{usd}</div>
				<div> eur:{eur}</div>
			</div>
		);
	}
}

Gcomment.propTypes = {
	movements: PropTypes.array.isRequired,

}

