const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//models
require('../models/Item.js');
const Item = mongoose.model('item');

router.get('/showitems',(req,res) => {
	if(req.user == undefined){
		return res.send({"result":'Você precisa esta logado'})
	}
	Item.find({user:req.user._id}).then((result) => {
		res.send(result)
	});
})

router.get('/:item',(req,res) => {
	if(req.user == undefined){
		return res.send("Você precisa estar logado");
	}
	Item.find({_id:req.params.item}).then((result) => {
		res.send(result);
	})
})

router.post('/additems',(req,res) => {
	if(req.user == undefined){
		return res.send("você precisa estar logado")
	}else{
		const newItem = new Item({
			title:req.body.title,
			description:req.body.description,
			tags:req.body.tags,
			user:req.user._id
		})
		newItem.save().then(() => {
			res.send({"message":"item salvo com sucesso"});
		})
	}
})

router.patch('/updateitem/:item',(req,res) => {
	if(req.user == undefined){
		return res.send("Você precisa estar logado");
	};
	Item.findOne({_id:req.params.item}).then((item) => {
		item.title = req.body.title,
		item.description = req.body.description,
		item.tags = req.body.tags
		
		item.save().then(() => {
			res.send("Item atualizado com successo!");
		}).catch(() => {
			res.send("Houve um erro na atualização do item");
		})
	});
})

router.delete('/deleteitem/:item',(req,res) => {
	if(req.user == undefined){
		return res.send("Você precisa estar logado");
	}
	Item.findOne({_id:req.params.item}).then((item) => {
		item.remove();
		res.send("Item removido com sucesso")
	}).catch(() => {
		res.send("Houve um erro ao deletar o item");
	})
})


module.exports = router;