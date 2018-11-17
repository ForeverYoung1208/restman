
export const fetchJSONfrom = (url) => {
	return fetch(url,
		{	method: 'GET',
			headers: {'Content-Type': 'application/json'}
		}
	).then( (r) => r.json() )
}

export const dashDateFormat = (date) =>{
	if(date){
		return (date.substring(6,10)+'-'+date.substring(3,5)+'-'+date.substring(0,2))
	}
}


