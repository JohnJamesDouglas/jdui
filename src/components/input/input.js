import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)

import './input.scss'

export default class Input extends Component {
	constructor(props) {
		super(props)
		this.state = { value: this.props.value }
	}
	handleChange = (e) => {
		const { type, name, callback } = this.props
		const re = /^[0-9\b]+$/

		// If the input type is number (note this is denominated by a react prop not the prop on the DOM element)
		if (type === 'number') {
			if (e.target.value === '' || re.test(e.target.value)) {
				//this.setState({ value: e.target.value }, callback(name, e.target.value))
				callback(name, e.target.value)
			}
		} else {
			//this.setState({ value: e.target.value }, callback(name, e.target.value))
			callback(name, e.target.value)
		}
	}
	reset = () => {
		console.log('reset')
		this.setState({ value: '' })
	}
	render() {
		const {
			state: {
				value
			},
			props: {
				placeholder,
				align,
				icon,
				readonly,
				password
			},
			handleChange
		} = this
		let inputClass = classNames({
			'input': true,
			[`input--${align}`]: align,
			'input__icon': icon
		})

		let standardInput =
			<input data-lpignore='true' className={inputClass} type={password ? 'password' : 'text'} defaultValue={value} placeholder={placeholder} onChange={handleChange} spellCheck='false' readOnly={readonly} />

		let iconInput =
			<div className='input__search'>
				<input data-lpignore='true' className={inputClass} defaultValue={value} placeholder={placeholder} onChange={handleChange} spellCheck='false' readOnly={readonly} />
				{icon}
			</div>

		// let standardInput =
		// 	<input className={inputClass} type={password ? 'password' : 'text'} value={value} placeholder={placeholder} onChange={handleChange} spellCheck='false' readOnly={readonly} />

		// let iconInput =
		// 	<div className='input__search'>
		// 		<input className={inputClass} value={value} placeholder={placeholder} onChange={handleChange} spellCheck='false' readOnly={readonly} />
		// 		{icon}
		// 	</div>

		return (
			icon ? iconInput : standardInput
		)
	}
}

Input.propTypes = {
	value: PropTypes.any,
	placeholder: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['text', 'number']).isRequired,
	readonly: PropTypes.bool
}