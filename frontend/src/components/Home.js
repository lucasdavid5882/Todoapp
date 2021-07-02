import React,{ useState ,useLayoutEffect } from 'react'
import { useHistory } from 'react-router-dom'

	
	

export const Home = () =>{
    const [items,setItems] = useState('Nenhum Item')
	const history = useHistory();
	
	
	useLayoutEffect(() => {
		fetch("http://localhost:3001/item/showitems",{
			credentials:'include'
		})
		.then((res) => {return res.json()})
		.then((data) => {
			
			if(data.result == "Você precisa esta logado"){
				setItems(data.result)
			}else{
			setItems(data)
			}
			
		})
		.catch((err) => console.log(err))
	},[])
	
	
	const deleteItem = (e,id) => {
		console.log("delete")
		e.preventDefault()
		fetch(`http://localhost:3001/item/deleteitem/${id}`,{
			method:'Delete',
			headers:{
				'Content-Type':'application/json'
			},
			credentials:'include'
		})
		.then(() => {
			window.location.reload()
		})
	}
		
		if(items !== 'Nenhum Item' && items !== "Você precisa esta logado"){
			console.log(items)
			return (
			<>
			<a href = "/adicionar"><button className = "btn btn-success mt-2 mb-2" >Adicionar novo item</button></a>
			
			{
			items.map((item) => 
			  <div className = "card" key = {item._id}>
			  <div className = "card-body">
				<h4>{item.title}</h4>
				<p>{item.description}</p>
				<div>
				<a href = {`/update/${item._id}`}><button className = "btn bg-primary mr-2">Atualizar</button></a>
				<button className = "btn bg-danger" onClick = {(e) => deleteItem(e,item._id)}>Deletar</button>
				
				</div>
			  </div>
			  </div>
				)
			}
			</>
			)
			
			
		}else{
			
			
			return (
			<h2>{items}</h2>
			)
		}
}