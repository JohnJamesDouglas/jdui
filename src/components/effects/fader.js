import React from 'react'
import Proptypes from 'prop-types'

import './fader.scss'

const fader = props => (
    <div className='fader' onClick={props.click} style={{ opacity: props.opacity }}/>
)

fader.propTypes = {
    click: Proptypes.func,
    opacity: Proptypes.number.isRequired
}

export default fader