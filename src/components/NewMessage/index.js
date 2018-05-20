import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import Alert from 'antd/lib/alert'
import './styles.css'

export default class NewMessage extends React.Component {
    static propTypes = {
        onOK: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        visible: PropTypes.bool,
    }

    static defaultProps = {
        visible: false,
    }

    constructor(props) {
        super(props)
        this.state = {
            address: '',
            subject: '',
            content: '',
            tips: '',
            confirmLoading: false,
        }
        this.formItems = [
            {id: 'address', title: '地址', placeholder: '收件人地址'},
            {id: 'subject', title: '标题', placeholder: '新消息标题'},
            {
                id: 'content',
                title: '内容',
                placeholder: '新消息内容最大长度为100个字符',
                Component: Input.TextArea,
                attrs: {rows: 3},
            },
        ]
    }

    handleChange = (evt, id) => {
        this.setState({
            [id]: evt.target.value,
            tips: '',
        })
    }

    handleOK = () => {
        const {address, subject, content} = this.state
        const tAddress = address.trim()
        const tSubject = subject.trim()
        const tContent = content.trim()

        if (!tAddress) {
            this.setState({tips: '请填写收件人地址'})
            return
        }
        if (!window.Account.isValidAddress(tAddress)) {
            this.setState({tips: '请填写有效的收件人地址'})
            return
        }
        if (!tSubject || tSubject.length > 30) {
            this.setState({tips: '请填写标题,最长30个字符'})
            return
        }
        if (tContent.length > 100) {
            this.setState({tips: '内容最大长度为100个字符'})
            return
        }

        this.setState({confirmLoading: true}, async () => {
            await this.props.onOK({
                address: tAddress,
                subject: tSubject,
                content: tContent,
            })

            this.setState({
                address: '',
                subject: '',
                content: '',
                confirmLoading: false,
            })
        })
    }

    render() {
        const {visible, onCancel} = this.props
        const {tips} = this.state

        return (
            <Modal
                title="新建消息"
                visible={visible}
                onOk={this.handleOK}
                onCancel={onCancel}
                okText="发送"
                cancelText="取消"
                wrapClassName="NewMessage"
                destroyOnClose
            >
                {
                    this.formItems.map(({id, title, placeholder, Component = Input, attrs = {}}) => (
                        <div className="NewMessage__Row" key={id}>
                            <label htmlFor={id} title={title}>{title}</label>
                            <Component
                                id={id}
                                value={this.state[id]}
                                onChange={evt => this.handleChange(evt, id)}
                                placeholder={placeholder}
                                {...attrs}
                            />
                        </div>
                    ))
                }

                {
                    !!tips
                    && (
                        <div className="NewMessage__Row">
                            <Alert message={tips} type="error" showIcon />
                        </div>
                    )
                }

                <div className="NewMessage__Row">
                    <Alert message="编写消息，点击发送，在弹出窗口中生成并发起交易，待交易成功后，点击页面上的“刷新”按钮，如此简单。" type="info" showIcon />
                </div>
            </Modal>
        )
    }
}
