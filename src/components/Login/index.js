import React from 'react'
import PropTypes from 'prop-types'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Alert from 'antd/lib/alert'
import './styles.css'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
        }
    }

    handleAddressChange = evt => {
        this.setState({address: evt.target.value})
    }

    handleConfirm = () => {
        this.props.onClick(this.state.address.trim())
    }

    render() {
        const {tips} = this.props
        const {address} = this.state

        return (
            <section className="Login">
                <Input
                    value={address}
                    onChange={this.handleAddressChange}
                    onPressEnter={this.handleConfirm}
                    placeholder="请输入钱包地址"
                    size="large"
                />

                {!!tips && <Alert message={tips} type="error" showIcon />}

                <Button
                    type="primary"
                    size="large"
                    onClick={this.handleConfirm}
                >
                    由此进入
                </Button>
            </section>
        )
    }
}

Login.propTypes = {
    onClick: PropTypes.func.isRequired,
    tips: PropTypes.string,
}

Login.defaultProps = {
    tips: '',
}
