import React, { Component } from 'react'
import Proptypes from 'prop-types'
import classNames from 'classnames'

import './rollerButton.scss'

export default class RollerButton extends Component {
	constructor(props) {
		super(props)
		this.state = { rolling: false, icon: this.props.icon, delay: this.props.delay }
	}
	onClick = () => {
		const {
			state: {
				delay
			},
			props: {
				reroll,
				click
			}
		} = this

		if (reroll) {
			this.setState({ rolling: true })
			setTimeout(() => this.setState({ rolling: false }), delay)
			click()
		}
	}
	render() {
		const {
			state: {
				rolling,
				icon
			},
			props: {
				children,
				reroll,
				animated
			},
			onClick
		} = this

		let rerollButtonClass = classNames({
			'button': true,
			'rerollButton': !reroll,
			'animated': animated
		})

		return (
			<button className={rerollButtonClass} onClick={onClick}>{ rolling ? icon : children }</button>
		)
	}
}

RollerButton.propTypes = {
	click: Proptypes.func.isRequired
}