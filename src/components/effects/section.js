import React from 'react'
import PropTypes from 'prop-types'

import './section.scss'

const section = props => {
    return (
        <section className='section' style={{ background: props.background }}>{props.children}</section>
    )
}

section.propTypes = {
	background: PropTypes.string
} 

export default section