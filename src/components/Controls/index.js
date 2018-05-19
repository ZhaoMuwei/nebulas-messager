import React from 'react'
import PropTypes from 'prop-types'
import Button from 'antd/lib/button'
import './styles.css'

export default class Controls extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            disabled,
            loading,
            onCreateButtonClick,
            onReloadButtonClick,
        } = this.props;

        return (
            <section className="Controls">
                <Button
                    type="primary"
                    icon="plus"
                    onClick={onCreateButtonClick}
                >
                    新消息
                </Button>

                <Button
                    icon="reload"
                    disabled={disabled}
                    loading={loading}
                    onClick={onReloadButtonClick}
                >
                    刷新
                </Button>
            </section>
        )
    }
}

Controls.propTypes = {
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    onCreateButtonClick: PropTypes.func.isRequired,
    onReloadButtonClick: PropTypes.func.isRequired,
}

Controls.defaultProps = {
    disabled: false,
    loading: false,
}
