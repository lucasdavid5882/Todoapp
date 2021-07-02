import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

import {Home} from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import {NoMatch} from './components/NoMatch'
import {Layout} from './components/items/Layout'
import NavigationBar from './components/items/NavigationBar'
import Adicionar from './components/Adicionar'
import Update from './components/Update'


function App() {
  return (
  <React.Fragment>
  <NavigationBar/>
  <Layout>
	  <Router>
		  <Switch>
		    <Route exact path = "/" component ={Home}/>
			<Route path = "/register" component ={Register}/>
		    <Route path = "/login" component ={Login}/>
		    <Route path = "/adicionar" component ={Adicionar}/>
		    <Route path = "/update/:id" component ={Update}/>
		    <Route component ={NoMatch}/>
			</Switch>
	  </Router>
	  </Layout>
  </React.Fragment>
  );
}

export default App;