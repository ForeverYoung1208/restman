import React from 'react'

export const roundFin = (str) => {
	return(parseFloat(str).toFixed(2))
}

export const fetchJSONfrom = (url) => {
	return fetch(url,
		{	method: 'GET',
			headers: {'Content-Type': 'application/json'}
		}
	).then( (r) => r.json() )
}

export const postDataAsJSON = (url,method,data,okCBK,errCBK) => {
	const token = $('meta[name="csrf-token"]').attr('content');	
	return fetch(url,
		{	method: method,
			body: JSON.stringify(data),
      credentials: 'same-origin',
			headers: 
						{'Content-Type': 'application/json',
			      'Accept': 'application/json',
		        'X-Requested-With': 'XMLHttpRequest',
		        'X-CSRF-Token': token
			      }
		}
	).then( (result) => okCBK(result) )
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

// sum array of numbers, Nan is equal to 0
export const AddNaN = (...args)=> {
	let res = args.reduce( (sum, arg) => sum += Number.isNaN(arg)||(!arg) ? 0 : parseFloat(arg) , 0 )
  return( res  )
}