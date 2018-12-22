import React, { Component } from 'react'
import Proptypes from 'prop-types'
import classNames from 'classnames'

import './buttonGroup.scss'

const buttonGroup = props => {
    let children = React.Children.map(props.children, (child, i) => {
		let value = child.props.children

		if (props.shortenValues) {
			if (child.props.children.length > 1) {
				value = child.props.children[child.props.children.length - 1]
			} else {
				value = child.props.children.length
			}

			value.replace(/\B\w/g, "").replace(/\s/g, '')
		}

        return React.cloneElement(child, { 
            children: value,
            selected: i === props.selected
         })
	})
	
    return (
        <div className='buttonGroup'>{children}</div>
    )
}

export default buttonGroup