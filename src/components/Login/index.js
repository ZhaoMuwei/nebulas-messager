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
                <div className="Login__Form">
                    <img
                        src={logo}
                        className="Login__Logo"
                        alt="logo of messenger"
                    />

                    <Input
                        value={address}
                        onChange={this.handleAddressChange}
                        onPressEnter={this.handleConfirm}
                        placeholder="在此输入已导入的钱包地址"
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
                </div>

                <div className="Login__Tips">
                    <p>请使用最新版 Chrome</p>
                    <p>
                        安装
                        <a
                            href="https://github.com/ChengOrangeJu/WebExtensionWallet"
                            target="_blank" rel="noopener noreferrer">
                            WebExtensionWallet
                        </a>
                        插件，并确保导入主网钱包
                    </p>
                </div>

                <p className="Login__Love">
                    Made with <span className="Login__Love-Icon">♥</span> by&nbsp;
                    <a
                        href="https://github.com/ZhaoMuwei/nebulas-messenger"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ZhaoMuwei
                    </a>
                </p>
            </section>
        )
    }
}
