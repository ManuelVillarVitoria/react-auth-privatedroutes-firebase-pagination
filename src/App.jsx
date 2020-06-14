import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' //npm i react-router-dom react-router
import Navbar from './components/Navbar';

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
            login...
          </Route>
          <Route path="/admin">
            admin...
          </Route>
        </Switch>
      </div>
    </Router>
   
  );
}

export default App;
