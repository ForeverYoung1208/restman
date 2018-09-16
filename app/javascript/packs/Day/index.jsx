import React from 'react'


export const Day = (props) => {
	const {message} = props
	return (
		<div>
			<div className = 'day-message' >Day here, got message { message }</div>
		</div>	
	)
}