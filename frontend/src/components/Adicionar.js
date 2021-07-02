import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Adicionar = () => {
	const [titulo,setTitulo] = useState('')
	const [descricao,setDescricao] = useState('')
	const history = useHistory()
	
	const addItem = (e) => {
		e.preventDefault();
		fetch("http://localhost:3001/item/additems",{
		method:'Post',
		headers:{
				'Content-Type':'application/json'
			},
			credentials:'include',
			body:JSON.stringify({
				"title":titulo,
				"description":descricao
		})
	})
	.then(res => {
			return res.json()
		}).then(() => history.push("/"))
		.catch((err) => console.log(err))
	}
	
	return(
	<>
	<h2>Adicione Um Novo Item</h2>
	  <div className ="card" >
	  <div className = "card-body">
	  
	    <form>
		<label htmlFor = "titulo">Titulo</label>
		<input className = "form-control" value = {titulo} onChange = {(e) => setTitulo(e.target.value)} required/>
		<label htmlFor = "descrição">Descrição</label>
		<textarea className = "form-control" value = {descricao} onChange = {(e) => setDescricao(e.target.value)} required></textarea>
		<button type = "submit" onClick = {addItem}className = "btn btn-success mt-4">Adicionar</button>
		
		</form>
	  
	  </div>
	  
	  </div>
	</>
	)
}

export default Adicionar