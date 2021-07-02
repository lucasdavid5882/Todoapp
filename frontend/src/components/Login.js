import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const history = useHistory()
	
	const fazLogin = (e) => {
		e.preventDefault();
		fetch("http://localhost:3001/usuario/login",{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			credentials:'include',
			body:JSON.stringify({
				"email":email,
				"password":password
		})
		})
		.then((res) => {
			return res.json()
		}).then(() => window.location.replace('http://localhost:3000'))
		.catch((err) => console.log(err))
	}
	
	
	return(
	  <div>
	  <h2>Login </h2>
	  <div className = "card">
	  <div className = "card-body">
		<form>
		
		  <label htmlFor = "email">Email</label>
		  <input type = "email" name = "email" className = "form-control" value = {email} onChange = {(e) => setEmail(e.target.value)} required/>
		  
		  <label htmlFor = "senha">Senha</label>
		  <input type = "password" name = "senha" className = "form-control" value = {password} onChange = {(e) => setPassword(e.target.value)} required/>
		  <button onClick = {fazLogin} className = "btn btn-success mt-4">Entrar</button>
		</form>
		</div>
		</div>
	  </div>
	)
}

export default Login