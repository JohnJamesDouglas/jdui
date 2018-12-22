import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './fileButton.scss'

export default class FileButton extends Component {
	constructor() {
		super()
		this.state = {}
	}
	handleChange = (e) => {
		const {
			props: {
				callback
			}
		} = this

		console.log('hC')
		const file = e.target.files[0]
		console.log(`file=${file}`)
		this.readFile(file, function (e) {
			// Return the text of the current file
			callback(e.target.result)
		});
	}
	readFile(file, callback) {
		let reader = new FileReader();
		reader.onload = callback;
		reader.readAsText(file);
		// Return the file name
		return file.name;
	}
	render() {
		const {
			props: {
				selected,
				children
			},
			file,
			handleChange
		} = this
		let fileButtonClass = classNames({
			'fileButton': true,
			'no-select': true,
			'fileButton--selected': selected
		})
		return (
			<button type='button' className={fileButtonClass}>
				{children}
				<input type="file" accept=".json" onChange={(e) => handleChange(e)}/>
			</button>
		)
	}
}

FileButton.propTypes = {
	selected: PropTypes.bool,
	callback: PropTypes.func.isRequired
}