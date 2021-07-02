import React,{ useState } from 'react'
import { useHistory } from 'react-router-dom'


const Update = ({match:{params}}) => {
	const [title,setTitle] = useState('')
	const [description,setDescription] = useState('')
	const history = useHistory()
	
	const sendUpdate = (e) => {
		e.preventDefault()
		fetch(`http://localhost:3001/item/updateitem/${params.id}`,{
			method:'PATCH',
			headers:{
				'Content-Type':'application/json'
			},
			credentials:'include',
			body:JSON.stringify({
				"title":title,
				"description":description
		})
		})
		.then(() => history.push("/"))
		.catch((err) => console.log(err))
	}
	
	return(
	  <div className = "card mt-4">
	  <div className = "card-body">
	  
	  <label htmlFor = "title">Titulo</label>
	  <input type = "text" className = "form-control" name = "title"value = {title} onChange = {(e) => {setTitle(e.target.value)}} required/>
	  <label htmlFor = "description">Descrição</label>
	  <textarea type = "text" className = "form-control" value = {description} name = "description" onChange = {(e) => setDescription(e.target.value)} required></textarea>
	  <button type = "submit" onClick = {sendUpdate} className = "btn btn-success mt-2">Atualizar</button>
	  
	  </div>
	  </div>
	)
}

export default Update