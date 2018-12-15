import React from 'react'
import PropTypes from 'prop-types'

import './spacer.scss'

const spacer = props => {
    return (
        <div className='spacer' style={{ height: props.height }}>{props.children}</div>
    )
}

spacer.propTypes = {
    height: PropTypes.string.isRequired
} 

export default spacer