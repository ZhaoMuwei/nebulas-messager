import React from 'react'
import PropTypes from 'prop-types'
import message from 'antd/lib/message'
import Controls from '../Controls'
import List from '../List'
import NewMessage from '../NewMessage'
import Detail from '../Detail'
import request from '../../utils/request'
import './styles.css'

export default class Inbox extends React.Component {
    static propTypes = {
        address: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {
            address: props.address,
            loading: true,
            messages: [],
            isModalVisible: false,
            view: 'in',
            isDetailVisible: false,
            detailID: '',
        }
    }

    componentDidMount() {
        this.hasMounted = true
        this.loadMessages()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.address !== this.state.address) {
            this.setState({address: nextProps.address}, () => {
                this.loadMessages()
            })
        }
    }

    componentWillUnmount() {
        this.hasMounted = false
    }

    loadMessages = async () => {
        this.setState({loading: true})

        const method = 'neb_call'
        const data = await request({
            data: {
                to : window.DApp,
                value : '0',
                contract : {
                    function : 'list',
                    args: `["${this.state.address}"]`,
                },
            },
            method,
        })

        if (!data || data.execute_err) {
            console.error(data.execute_err)
            return
        }

        try {
            const result = JSON.parse(data.result)
            if (this.hasMounted) {
                this.setState({messages: result, loading: false});
            }
        }
        catch(error) {
            throw error
        }
    }

    handleCreateButtonClick = () => {
        this.setState({isModalVisible: true})
    }

    handleReloadButtonClick = () => {
        this.loadMessages()
    }

    handleViewChange = view => {
        this.setState({view})
    }

    handleMessageDelete = id => {
        // TODO
        message.info('删除功能即将上线');
    }

    handleMessageDetail = id => {
        this.setState({isDetailVisible: true, detailID: id})
    }

    buildDetailData = id => {
        if (!id) {
            return {}
        }
        return this.state.messages.find(message => message.id === id)
    }

    handleNewMessageOK = async ({address, subject, content}) => {
        const method = 'neb_sendTransaction'
        const response = await request({
            data: {
                to : window.DApp,
                value : '0',
                contract : {
                    function : 'send',
                    args: `["${this.state.address}", "${address}", "${subject}", "${content}"]`,
                },
            },
            method,
        })

        if (!response || !response.txhash) {
            return
        }

        // Finally, msg sent successfully.
        setTimeout(() => {
            this.setState({isModalVisible: false})
        }, 3 * 1000)
    }

    handleNewMessageCancel = () => {
        this.setState({isModalVisible: false})
    }

    render() {
        const {
            messages,
            loading,
            isModalVisible,
            view,
            isDetailVisible,
        } = this.state

        let filteredMessages
        switch (view) {
            case 'in':
                filteredMessages = messages.filter(
                    message => message.status === 'normal' && message.to === this.state.address
                )
                break
            case 'out':
                filteredMessages = messages.filter(
                    message => message.status === 'normal' && message.from === this.state.address
                )
                break;
            default:
                filteredMessages = messages.filter(
                    message => message.status === 'deleted'
                )
        }

        return (
            <section className="Mailbox">
                <Controls
                    disabled={loading}
                    loading={loading}
                    currentView={view}
                    onCreateButtonClick={this.handleCreateButtonClick}
                    onReloadButtonClick={this.handleReloadButtonClick}
                    onViewChange={this.handleViewChange}
                />
                <div className="Mailbox__ListWrapper">
                    <List
                        loading={loading}
                        data={filteredMessages}
                        onDelete={this.handleMessageDelete}
                        onDetail={this.handleMessageDetail}
                    />
                </div>

                <NewMessage
                    visible={isModalVisible}
                    onOK={this.handleNewMessageOK}
                    onCancel={this.handleNewMessageCancel}
                />

                <Detail
                    visible={isDetailVisible}
                    onCancel={() => this.setState({isDetailVisible: false})}
                    {...this.buildDetailData(this.state.detailID)}
                />
            </section>
        )
    }
}
