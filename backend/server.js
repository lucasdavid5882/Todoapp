const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
require("./config/auth.js")(passport);
const cors = require("cors");
const cookieParser = require("cookie-parser");
//routes
const Usuario = require('./routes/Usuario');
const Item = require('./routes/Item');
const bodyParser = require('body-parser');
require('dotenv').config();
// app.use(cors({
	// Origin:'http://localhost:3000',
	// credentials:true
// }))

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


app.use(session({
	secret:"whatever",
	resave:true,
    saveUninitialized:true
}));

app.use(cookieParser("whatever"))
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
	  res.locals.user = req.user || null;
	  next();
  })


// app.use(express.json());
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json());
//mongoose
mongoose.connect(process.env.DB,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
	console.log("connected to mongodb");
})
mongoose.Promise = global.Promise;

app.use('/usuario',Usuario);
app.use('/item',Item)

Port = 3001;
app.listen(process.env.PORT || Port,() => {
	console.log(`connected,Running on port ${Port}`)
})