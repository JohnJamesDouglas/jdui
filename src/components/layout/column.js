import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './column.scss'

const column = props => {
  let colClass = classNames({
    'col': true,
    [`col__s--${props.s}`]: props.s,
    [`col__m--${props.m}`]: props.m,
    [`col__l--${props.l}`]: props.l,
    [`col__s--offset-${props.offsetS}`]: props.offsetS,
    [`col__m--offset-${props.offsetM}`]: props.offsetM,
    [`col__l--offset-${props.offsetL}`]: props.offsetL,
    'col--gutters': props.gutters
  })
  return (
    <div className={colClass}>{props.children}</div>
  )
}

column.propTypes = {
  s: PropTypes.number.isRequired,
  m: PropTypes.number.isRequired,
  l: PropTypes.number.isRequired,
  offsetS: PropTypes.number,
  offsetM: PropTypes.number,
  offsetL: PropTypes.number
  //gutters: PropTypes.boolean.isRequired
}

export default column