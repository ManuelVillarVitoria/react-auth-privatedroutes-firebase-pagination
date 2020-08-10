import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' 
import Navbar from './layout/Navbar';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Reset from './pages/Reset';
import Inicio from './pages/Home';

const Routes = ({firebaseUser}) => (
    <Router>
        <div className="container">
            <Navbar firebaseUser={firebaseUser} />
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/admin">
                    <Admin />
                </Route>
                <Route path="/reset">
                    <Reset />
                </Route>
                <Route path="/" exact>
                    <Inicio />
                </Route>
            </Switch>
        </div>
    </Router>
)

export default Routes;
