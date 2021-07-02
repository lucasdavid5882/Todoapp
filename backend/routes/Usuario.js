const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//models
require('../models/User.js');
const User = mongoose.model("user");

require('../models/Item.js')
const Item = mongoose.model('item');

router.get('/',(req,res) => {
	req.user?res.send({"name":req.user.name}):res.send({"name":null});
});


router.post('/register',(req,res) => {
	try {
		let errors = [];
		
		if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
			errors.push("nome inválido");
		};
		if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
			errors.push("email inválido");
		};
		if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
			errors.push("password inválido");
		};
		if(req.body.password.length < 8){
			errors.push("Senha deve ter no mínimo 8 caracteres");
		};
		
		if(errors.length > 0){
			console.log(errors)
		}else{
			User.findOne({email:req.body.email}).then((usuario) => {
				if(usuario){
					res.json({"message":"este email já está registrado"});
				}else{
					const newUser = new User({
						name:req.body.name,
						email:req.body.email,
						password:req.body.password
					})
					bcrypt.genSalt(10,(err,salt)=> {
						bcrypt.hash(newUser.password,salt,(err,hash) => {
						  if(err){
							res.send(err);
						  }else{
							newUser.password = hash;
							newUser.save().then(() => {
								res.json({"message":"sucesso"})
							})
						  }							  
						})
					})
				}
			});
		}
	} catch(err) {
		console.log(err)
		return res.status(400).send({error:err});
	}
});

router.get('/sucesso',(req,res) => {
	res.send("sucesso")
})
router.get('/test',(req,res) => {
	res.send(req.user)
})
router.get('/falha',(req,res) => {
	res.send("falha")
})

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.json("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json("Successfully Authenticated");
      });
    }
  })(req, res, next);
});

router.get('/logout',(req,res) => {
	req.logout();
	res.send("Você deslogou");
})

module.exports = router;