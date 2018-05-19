import React from 'react'
import Inbox from './components/Inbox'
import Login from './components/Login'
import './App.css'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            tips: '',
        }
    }

    async componentDidMount() {
        this.hasMounted = true;
    }

    componentWillUnmount() {
        this.hasMounted = false;
    }

    handleLogin = address => {
        if (!window.Account.isValidAddress(address)) {
            this.setState({tips: '请输入有效的钱包地址'})
            return
        }

        this.setState({tips: '', address})
    }

    render() {
        const {address, tips} = this.state;

        return (
            <section className="App">
                {
                    !!address
                    ? (
                        <Inbox address={address} />
                    )
                    : (
                        <Login onClick={this.handleLogin} tips={tips} />
                    )
                }
            </section>
        );
    }
}
