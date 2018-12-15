import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './row.scss'

const row = props => {
  return (
    <div className='row'>{props.children}</div>
  )
}

row.propTypes = {}

export default row