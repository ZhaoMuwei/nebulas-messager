import React from 'react'
import PropTypes from 'prop-types'
import AntdList from 'antd/lib/list'
import Item from '../ListItem'
import './styles.css'

export default class List extends React.Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            from: PropTypes.string,
            to: PropTypes.string,
            subject: PropTypes.string,
            content: PropTypes.string,
            timestamp: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            status: PropTypes.string,
        })),
        onDelete: PropTypes.func.isRequired,
        onDetail: PropTypes.func.isRequired,
    }

    static defaultProps = {
        data: [],
    }

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
                    renderItem={item => {
                        const itemData = {
                            id: item.id,
                            author: item.from,
                            subject: item.subject,
                            content: item.content,
                        }
                        return <Item
                            {...itemData}
                            onDelete={this.props.onDelete}
                            onDetail={this.props.onDetail}
                        />
                    }}
                    locale={{
                        emptyText: '空'
                    }}
                />
            </section>
        )
    }
}
