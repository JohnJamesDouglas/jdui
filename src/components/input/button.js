import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './button.scss'

const button = props => {
    let buttonClass = classNames({
        'button': true,
        'no-select': true,
        'button--selected': props.selected
    })
    return (
        <button type='button' className={buttonClass} onClick={props.click}>
            {props.children}
        </button>
    )
}

button.propTypes = {
	click: PropTypes.func.isRequired,
	selected: PropTypes.bool
}

export default button