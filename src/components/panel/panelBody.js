import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './panelBody.scss'

export default class PanelBody extends Component {
  render() {
    return (
	<div className='panel__body'>{/*style={{ width: this.props.bodyWidth+'%' }}>*/}
          {this.props.children}
        </div>
    )
  }
}

PanelBody.propTypes = {
  bodySide: PropTypes.string,
  bodyWidth: PropTypes.number
}