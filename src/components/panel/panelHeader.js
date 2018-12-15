import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './panelHeader.scss'

export default class PanelHeader extends Component {
	render() {
		const {
			props: { children }
		} = this
		return (
			<div className='panel__header'>{/*+this.props.headerSide} style={{ width: this.props.headerWidth+'%' }}>*/}
				{children}
			</div>
		)
	}
}

PanelHeader.propTypes = {
	headerSide: PropTypes.string,
	headerWidth: PropTypes.number
}