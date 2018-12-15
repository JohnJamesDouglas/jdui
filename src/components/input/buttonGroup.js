import React, { Component } from 'react'
import Proptypes from 'prop-types'
import classNames from 'classnames'

// const column = props => {
//   let colClass = classNames({
//     'col': true,
//     [`col-s-${props.s}`]: props.s,
//     [`col-m-${props.m}`]: props.m,
//     [`col-l-${props.l}`]: props.l,
//     [`col-s-offset-${props.offsetS}`]: props.offsetS,
//     [`col-m-offset-${props.offsetM}`]: props.offsetM,
//     [`col-l-offset-${props.offsetL}`]: props.offsetL,
//     'col-gutters': props.gutters
//   })

import './buttonGroup.scss'

const buttonGroup = props => {
    let children = React.Children.map(props.children, (child, i) => {
        let value = child.props.children.replace(/\B\w/g, "").replace(/\s/g, '')
        return React.cloneElement(child, { 
            children: value,
            selected: i == props.selected
         })
    })
    return (
        <div className='button__group'>{children}</div>
    )
}

export default buttonGroup