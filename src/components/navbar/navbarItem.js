import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './navbarItem.scss'

const navbarItem = props => {
	let navbarItemClass = classNames({
		'navbar__item': true,
		'navbar__item--condensed': props.condensed
	})
	return (
		<div className={navbarItemClass}>
			{props.children}
		</div>
	)
}

navbarItem.propTypes = {
  condensed: PropTypes.bool.isRequired
}

export default navbarItem