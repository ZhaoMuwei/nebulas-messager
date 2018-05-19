import React from 'react'
import PropTypes from 'prop-types'
import AntdList from 'antd/lib/list'
import Avatar from 'antd/lib/avatar'
import './styles.css'

export default class List extends React.Component {
    render() {
        const {
            loading,
            data,
        } = this.props

        return (
            <section className="List">
                <AntdList
                    loading={loading}
                    dataSource={data}
                    renderItem={item => (
                        <AntdList.Item actions={[]}>
                            <AntdList.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={item.subject}
                                description={item.content}
                            />
                        </AntdList.Item>
                    )}
                />
            </section>
        )
    }
}

List.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        subject: PropTypes.string,
        content: PropTypes.string,
        timestamp: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    })),
}

List.defaultProps = {
    data: [],
}
