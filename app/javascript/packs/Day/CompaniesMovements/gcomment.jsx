import React from "react"
import PropTypes from "prop-types"



export default class Gcomment extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		const {movement, ddirection, dcurrency} = this.props
		let res = 'GComment here'
		return res;
	}
}

Gcomment.propTypes = {
	movements: PropTypes.array.isRequired,
	company_id: PropTypes.number.isRequired,
	direction: PropTypes.string.isRequired,

}

