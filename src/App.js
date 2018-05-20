import React from 'react'
import Mailbox from './components/Mailbox'
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
                    ? <Mailbox address={address} />
                    : <Login onClick={this.handleLogin} />
                }
            </section>
        );
    }
}
