import React from 'react'
import Inbox from './components/Inbox'
import Login from './components/Login'
import './App.css'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
        }
    }

    handleLogin = address => {
        this.setState({address})
    }

    render() {
        const {address} = this.state;

        return (
            <section className="App">
                <div className="App__Background" />
                {
                    address
                    ? <Inbox address={address} />
                    : <Login onClick={this.handleLogin} />
                }
            </section>
        );
    }
}
