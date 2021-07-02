import React,{ useState,useLayoutEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import styled from 'styled-components';

const Styles = styled.div`

.navbar-brand, .navbar-nav .nav-link{
	color:#bbb;
	
	&:hover{
		color:#fff;
	}
}

`;



const NavigationBar = () => {
	
	const [name,setName] = useState('')
	
	
	useLayoutEffect(() => {
		fetch("http://localhost:3001/usuario/",{
			credentials:'include'
		})
		.then((res) => {return res.json()})
		.then((data) => {
			console.log(data)
			if(data.name !== null ){
			  setName(data.name)
			}
			})
		.catch((err) => console.log(err))
	},[])
	
	const logout = () => {
		fetch("http://localhost:3001/usuario/logout",{
			credentials:'include'
		})
		.then((res) => {window.location.reload()})
		.catch((err) => console.log(err))
	}
	
	
	if(name){
		console.log(name)
	return(
<Styles>
  
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="/"> Todo - app</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="/register" onClick = {logout}>Logout <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item nav-link">
	  {name}
      </li>
	  
    </ul>
  </div>
</nav>
  
</Styles>
	)
	}else{
		return(
		
			<Styles>
			  
			  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			  <a className="navbar-brand" href="/"> Todo - app</a>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
				  <li className="nav-item active">
					<a className="nav-link" href="/register">Registre-se <span className="sr-only">(current)</span></a>
				  </li>
				  <li className="nav-item">
					<a className="nav-link" href="/login">Login</a>
				  </li>
				  
				</ul>
			  </div>
			</nav>
			  
			</Styles>
		
		)
	}
}

export default NavigationBar