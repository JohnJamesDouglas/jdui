import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Paragraph from '../text/paragraph'
import Input from '../input/input'

import './login.scss'

export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = { username: '', password: ''  }
	}
	handleInput = (name, data) => {
		switch(name) {
			case 'username':
				console.log(`username=${data}`)
				break;
			case 'password':
				console.log(`username=${data}`)
				break;
			default:
		}
	}
	render() {
		const {
			state: {
				
			},
			handleInput
		} = this
		return (
			<div className='login'>
				<Input type='text' align='left' value={''} placeholder='Username' name='username' callback={handleInput} />
				<Input type='text' align='left' value={''} placeholder='Password' name='password' callback={handleInput} />
			</div>
		)
	}
}

Login.propTypes = {}