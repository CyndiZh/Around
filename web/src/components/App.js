import React, { Component } from 'react';
import { Header } from './Header'
import { Main} from "./Main"
import '../styles/App.css';
import { TOKEN_KEY } from '../constants';

class App extends Component {
    state = {
        isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY)),
    }
    handleLogin = (token) => {
        // global available (like HashMap)
        localStorage.setItem(TOKEN_KEY, token);
        this.setState({ isLoggedIn: true});
    }
    handleLogout = () => {
        // global available (like HashMap)
        localStorage.removeItem(TOKEN_KEY);
        this.setState({ isLoggedIn: false});
    }
    render() {
        return (
            <div className="App">
                <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
                <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
            </div>
        );
    }
}

export default App;
