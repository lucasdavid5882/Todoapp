import React from 'react'

	
	
	const descobreUsuario = () => {
		fetch("http://localhost:3001/usuario/",{
			credentials:'include'
		})
		.then((res) => {return res.json()})
		.then((data) => console.log(data))
		.catch((err) => console.log(err))
	}

export const Home = () =>{
	return(
	  <div>
	    <h2>Hi </h2>
		<p>This is a ToDo app </p>
		<button onClick = {descobreUsuario} className = "btn bg-primary">Test</button>
	  </div>
	)
}