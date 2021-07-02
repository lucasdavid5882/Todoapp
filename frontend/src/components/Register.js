import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'

const Register = () =>{
	const [name,setName] = useState('');
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const history = useHistory();
	
	
	const sendRegister = (e) => {
		e.preventDefault()
		fetch("http://localhost:3001/usuario/register",{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			credentials:'include',
			body:JSON.stringify({
				"name":name,
				"email":email,
				"password":password
		})
		})
		.then(res => {
			return res.json()
		}).then(() => history.push("/"))
		.catch((err) => console.log(err))
	}
	
	return(
	  
	  <>
		<h2>Registre-se</h2>
		<div className = "card">
		  <div className = "card-body">
		  
			<form action = "http://localhost:3001/usuario/register" method = "post" encType='application/x-www-form-urlencoded'>
			
			  <label htmlFor = "nome">Nome: </label>
				<input type = "text" name = "name" value = {name} onChange = {(e) => setName(e.target.value)} className = "form-control" required/>
				
				<label htmlFor = "email">Email: </label>
				<input type = "email" name = "email" value = {email} onChange = {(e) => setEmail(e.target.value)} className = "form-control" required/>
				
				<label htmlFor = "senha">Senha: </label>
				<input type = "password" name = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} className = "form-control" required/>
				
				
				<button type = "submit" onClick = {sendRegister} className = "btn btn-success mt-4">Cadastrar</button>
				
			</form>
			
		  </div>
		</div>
	</>
	  
	)
}

export default Register