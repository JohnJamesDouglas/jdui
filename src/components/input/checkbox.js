import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './checkbox.scss'

export default class Checkbox extends Component {
	constructor(props) {
		super(props)
		this.state = { checked: this.props.checked }
	}
	handleClick = () => {
		const { 
			state: {
				checked 
			}, 
			props: { 
				callback,
				name
			} 
		} = this

		this.setState({ checked: !checked }, callback(name, checked))
	}
	render() {
		const {
			state: { 
				checked 
			},
			handleClick
		} = this

		return (
			<div className='checkbox' onClick={handleClick}>
				{
					!checked && <div className='checkbox__circle checkbox--false'><div className='checkbox__left' /><div className='checkbox__right' /></div>
				}
				{
					checked && <div className='checkbox__circle checkbox--true'><div className='checkbox__left' /><div className='checkbox__right' /></div>
				}
			</div>
		)
	}
}

Checkbox.propTypes = {}