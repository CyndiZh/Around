import React from 'react';
import '../styles/Main.css';
import { Home } from "./Home"
import { Login } from './Login';
import { Register } from './Register';
import { Switch, Route, Redirect} from 'react-router';


export class Main extends React.Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/home"/> : <Login handleLogin={this.props.handleLogin}/>;
    }

    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Redirect to="/login"/> ;
    }

    getRoot = () => {
        return <Redirect to="/login"/> ;
    }
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getRoot}/>
                    <Route exact path="/home" render={this.getHome}/>
                    <Route exact path="/login" render={this.getLogin}/>
                    <Route exact path="/register" component={Register}/>
                    <Route render={this.getRoot}/>
                </Switch>
            </div>
        );
    }
}
