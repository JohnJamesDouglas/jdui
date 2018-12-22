import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './notification.scss'

export default class Notification extends Component {
	static propTypes = {
		delay: PropTypes.number.isRequired,
		callback: PropTypes.func.isRequired
	}
	componentDidUpdate(prevProps) {
		console.log('cDU')
		const {
			props: {
				show,
				callback,
				delay
			}
		} = this
		if (show) {
			setTimeout(() => callback(), delay)
		}
	}
	render() {
		const {
			props: {
				show,
				type,
				children,
				callback
			}
		} = this

		let notificationClass = classNames({
			'notification': true,
			'notification--primary': type === 'primary',
			'notification--secondary': type === 'secondary',
			'notification--secondary-alt': type === 'secondary-alt',
			'notification--highlight': type === 'highlight',
			'notification--success': type === 'success',
			'notification--warning': type === 'warning',
			'notification--error': type === 'error',
			'show': show
		})

		return (
			<div className={notificationClass}>
				{children}
				<FontAwesomeIcon icon='times' onClick={() => callback()} />
			</div>
		)
	}
}