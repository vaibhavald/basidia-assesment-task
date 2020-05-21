import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

import './App.css';
import Signup from './components/Signup';
import SignIn from './components/Signin';
import Home from './components/Home';
import Weather from './components/Weather';
import Logout from './components/Logout';
import Protected from './components/Protected';


function App() {
    var auth = JSON.parse(localStorage.getItem("is_login")); 
    return (
        <div className="App">
            {
            (auth == true) 
            ? 
                <Router>
                    <Link to="home">Home</Link>
                    <Link to="weather">Weather</Link>
                    <Link to="logout">Logout</Link>
                    <Switch>
                        <Route path="/Home">
                            <Protected component={Home}/>
                        </Route>
                        <Route path="/Weather" component={Weather}>
                            <Protected component={Weather}/>   
                        </Route>
                        <Route path="/Logout" component={Logout}>
                            <Protected component={Logout}/>   
                        </Route>
                    </Switch>
                </Router>  
        :
                <Router>
                    <Link to="signup">Sign Up</Link>
                    <Link to="signin">Sign In</Link>
                    <Switch>
                        <Route path="/Signup" component={Signup}>
                        </Route>
                        <Route path="/Signin" component={SignIn}>
                        </Route>
                    </Switch>
                </Router>
        }
        </div>
    );
}

export default App;
