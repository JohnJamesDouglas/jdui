import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './container.scss'

export default class Container extends Component {
  render() {
	let containerClass = classNames({
		'container': true,
		'container--overflow': this.props.overflow
	})
    return (
        <div id={this.props.id} className={containerClass}>
          {this.props.children}
        </div>
    )
  }
}

Container.propTypes = {
    id: PropTypes.string.isRequired,
    overflow: PropTypes.bool.isRequired
}