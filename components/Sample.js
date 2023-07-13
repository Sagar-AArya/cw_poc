import React, { useEffect, useState } from 'react'

const Sample = () => {
	const [records, setRecords] = useState([]);

	let accessToken;
	if(localStorage) {
		accessToken = localStorage.getItem("accessToken");
	};

	const loadData = async() => {
		const headers = {
			Authorization: `Bearer ${accessToken}`
		  }
		  
		  fetch('/api/hello', { headers })
			.then(response => {
				return response.json();
			})
			.then(result => {
				console.log(result);
				setRecords(result.data);
			})
			.catch(error => {
				console.log(error);
			})
	}
	
	  useEffect(() => {
		loadData();
	  }, []);
	
	return (
		<>
			hello api got success
			{
				JSON.stringify(records)
			}
		</>
	)
}

export default Sample;
