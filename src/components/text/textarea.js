import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './textarea.scss'

export default class Textarea extends Component {
	constructor(props) {
        super(props)
        this.state = { value: this.props.value }
    }
    handleChange = (e) => {
        const { props: { name, callback } } = this
        this.setState({value: e.target.value}, callback(name, e.target.value))
    }
	render() {
		const { state: { value }, props: { placeholder, resize }, handleChange } = this
		let textareaClass = classNames({
			'textarea': true,
			'textarea--resize': resize
		})
		return (
			<textarea className={textareaClass} value={value} placeholder={placeholder.toLowerCase()} onChange={handleChange} spellCheck="false" />
		)
	}
}

Textarea.propTypes = {
	resize: PropTypes.bool.isRequired,
	placeholder: PropTypes.string.isRequired
	//value: PropTypes.string.isRequired
}