import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Paragraph from '../../text/paragraph'

import './accordionBody.scss'

class AccordionHeader extends Component {
	render() {
		const { props: { children } } = this
		return (
			<React.Fragment>
				{children}
			</React.Fragment>
			// <div className='accordionHeader'>
			// 	{children}
			// </div>
		)
	}
}

export default AccordionHeader
