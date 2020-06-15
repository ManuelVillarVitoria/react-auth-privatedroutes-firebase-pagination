import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' //npm i react-router-dom react-router
import Navbar from './components/Navbar';
import Login from './components/Login';
import Admin from './components/Admin';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/" exact>
            inicio...
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </div>
    </Router>
   
  );
}

export default App;
