import React from 'react'

export const fetchJSONfrom = (url) => {
	return fetch(url,
		{	method: 'GET',
			headers: {'Content-Type': 'application/json'}
		}
	).then( (r) => r.json() )
}

export const postDataAsJSON = (url,data,okCBK,errCBK) => {
	return fetch(url,
		{	method: 'POST',
			body: JSON.stringify(data),
			headers: 
						{'Content-Type': 'application/json',
			      'Accept': 'application/json' }
		}
	).then( (result) => okCBK(result.json()) )
	.catch ((error) => errCBK(error))
}

export const dashDateFormat = (date) =>{
	if(date){
		return (date.substring(6,10)+'-'+date.substring(3,5)+'-'+date.substring(0,2))
	}
}

export const Spinner = ()=>{
	return(
		<div id="circle">
		  <div className="loader">
		    <div className="loader">
		        <div className="loader">
		           <div className="loader">

		           </div>
		        </div>
		    </div>
		  </div>
		</div> 
	)
}
