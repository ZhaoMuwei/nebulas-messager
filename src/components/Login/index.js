import React from 'react'
import PropTypes from 'prop-types'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Alert from 'antd/lib/alert'
import logo from './logo.png'
import './styles.css'

export default class Login extends React.Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {
            address: '',
            tips: '',
        }
    }

    handleAddressChange = evt => {
        this.setState({address: evt.target.value})
    }

    handleConfirm = () => {
        const {address} = this.state
        if (!window.Account.isValidAddress(address)) {
            this.setState({tips: '请输入有效的钱包地址'})
            return
        }
        this.setState({tips: ''})
        this.props.onClick(address.trim())
    }

    render() {
        const {address, tips} = this.state

        return (
            <section className="Login">
                <img
                    src={logo}
                    className="Login__Logo"
                    alt="logo of messenger"
                />

                <Input
                    value={address}
                    onChange={this.handleAddressChange}
                    onPressEnter={this.handleConfirm}
                    placeholder="输入钱包地址"
                    size="large"
                />

                {!!tips && <Alert message={tips} type="error" showIcon />}

                <Button
                    type="primary"
                    size="large"
                    onClick={this.handleConfirm}
                >
                    进入信箱
                </Button>
            </section>
        )
    }
}
