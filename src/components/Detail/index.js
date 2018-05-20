import React from 'react'
import Modal from 'antd/lib/modal'
import PropTypes from 'prop-types'
import './styles.css'

export default class Detail extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        subject: PropTypes.string,
        content: PropTypes.string,
        from: PropTypes.string,
        to: PropTypes.string,
        timestamp: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        onCancel: PropTypes.func.isRequired,
    }

    render() {
        const {visible, subject, content, from, to, timestamp} = this.props

        let date: string;
        try {
            date = (new Date(+timestamp)).toLocaleDateString()
        }
        catch(error) {
            date = '*未来*'
        }

        return (
            <Modal
                visible={visible}
                wrapClassName="Detail"
                footer={null}
                onCancel={this.props.onCancel}
            >
                <div className="Detail__Wrapper">
                    <p className="Detail__Title">标题</p>
                    <p className="Detail__Item Detail__Subject">{subject}</p>

                    <p className="Detail__Title">发往</p>
                    <p className="Detail__Item Detail__To">{to}</p>

                    <p className="Detail__Title">时间</p>
                    <p className="Detail__Item Detail__Timestamp">{date}</p>

                    <p className="Detail__Title">内容</p>
                    <p className="Detail__Item Detail__Content">{content || '*没有内容*'}</p>

                    <p className="Detail__Title">来自</p>
                    <p className="Detail__Item Detail__From">{from}</p>
                </div>
            </Modal>
        )
    }
}
