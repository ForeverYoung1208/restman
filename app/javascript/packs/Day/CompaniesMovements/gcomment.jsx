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

Comment.propTypes = {
	movement: PropTypes.object.isRequired,
	ddirection: PropTypes.string.isRequired,
	dcurrency: PropTypes.string.isRequired
}

