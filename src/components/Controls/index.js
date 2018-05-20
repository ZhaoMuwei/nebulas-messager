import React from 'react'
import PropTypes from 'prop-types'
import Button from 'antd/lib/button'
import Radio from 'antd/lib/radio';
import './styles.css'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

export default class Controls extends React.Component {
    static propTypes = {
        currentView: PropTypes.string,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        onCreateButtonClick: PropTypes.func.isRequired,
        onReloadButtonClick: PropTypes.func.isRequired,
        onViewChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
        currentView: 'in',
        disabled: false,
        loading: false,
    }


    handleViewChange = evt => {
        const value = evt.target.value
        if (value !== this.props.currentView) {
            this.props.onViewChange(value)
        }
    }

    render() {
        const {
            disabled,
            loading,
            onCreateButtonClick,
            onReloadButtonClick,
            currentView,
        } = this.props;

        return (
            <section className="Controls">
                <div className="Controls__Buttons">
                    <div className="Controls__Edit-Buttons">
                        <Button type="primary" icon="plus" onClick={onCreateButtonClick}>新建</Button>
                        <Button icon="reload" disabled={disabled} loading={loading} onClick={onReloadButtonClick}>刷新</Button>
                    </div>

                    <div className="Controls__View-Butonns">
                        <RadioGroup onChange={this.handleViewChange} defaultValue="in" value={currentView}>
                            <RadioButton value="in">收件箱</RadioButton>
                            <RadioButton value="out">发件箱</RadioButton>
                            <RadioButton value="trash">回收站</RadioButton>
                        </RadioGroup>
                    </div>
                </div>
            </section>
        )
    }
}
