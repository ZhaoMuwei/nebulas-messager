import React from 'react'
import PropTypes from 'prop-types'
import Button from 'antd/lib/button'
import Tooltip from 'antd/lib/tooltip'
import './styles.css'

export default class ListItem extends React.Component {
    static propTypes = {
        onDetail: PropTypes.func,
        onDelete: PropTypes.func,
        id: PropTypes.string.isRequired,
        author: PropTypes.string,
        subject: PropTypes.string,
        content: PropTypes.string,
    }

    render() {
        const {id, author = ' ', subject = ' ', content = ' '} = this.props

        return (
            <div className="ListItem">
                <Tooltip title={author || 'someone'} overlayClassName="ListItem__Tooltip">
                    <p className="ListItem__Avatar">{(author[author.length - 1] || 'S').toUpperCase()}</p>
                </Tooltip>

                <p className="ListItem__Subject">{subject}</p>

                <p className="ListItem__Content">{content || '*没有内容*'}</p>

                <div className="ListItem__Operations">
                    <Button shape="circle" size="small" onClick={() => this.props.onDetail(id)} icon="search" />
                    <Button shape="circle" size="small" onClick={() => this.props.onDelete(id)} icon="close" />
                </div>
            </div>
        )
    }
}
