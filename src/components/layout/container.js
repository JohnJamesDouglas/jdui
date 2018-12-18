import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faEllipsisH, faEllipsisV)


import './container.scss'

export default class Container extends Component {
	constructor(props) {
		super(props)
		// layout - true = column, false = row
		this.state = { toggle: this.props.toggle, layout: true }
	}
	toggleLayout = () => {
		this.setState(state => ({
			layout: !state.layout
		}))
	}
	render() {
		const {
			state: {
				layout
			},
			props: {
				overflow,
				toggle,
				children
			},
			toggleLayout
		} = this

		let containerClass = classNames({
			'container': true,
			'container--overflow': overflow,
			'container--toggleColumn': layout,
			'container--toggleRow': !layout
		})

		let icon = layout ? <FontAwesomeIcon icon='ellipsis-h' /> : <FontAwesomeIcon icon='ellipsis-v' />

		return (
			<div className={containerClass}>
				{ toggle && <div className='container__toggle' onClick={() => toggleLayout()}>{icon}</div> }
				{children}
			</div>
		)
	}
}

Container.propTypes = {
	overflow: PropTypes.bool.isRequired,
	toggle: PropTypes.bool.isRequired

}