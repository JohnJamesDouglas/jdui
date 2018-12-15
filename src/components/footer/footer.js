import React, { Component } from 'react'
import Proptypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faReact, faSass, faFontAwesome, faStackOverflow, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'

library.add( faTwitter, faFacebook, faCopyright )

import Spacer from '../effects/spacer'

import './footer.scss'


const footer = props => {
	//let numChildren = (100/React.Children.count(this.props.children))
	return (
		<React.Fragment>
			{/* <Spacer height='7.5vh'></Spacer> */}
			<footer className='footer'>
				<div className='footer__links'>
					<p align='left'>Made by John Douglas <FontAwesomeIcon icon='copyright' /></p>
					{props.children}					
				</div>
				<div className='footer__brands'>
					<FontAwesomeIcon icon={['fab','twitter']}/>
					<FontAwesomeIcon icon={['fab','facebook']}/>
				</div>
			</footer>
		</React.Fragment>
	)
}

footer.propTypes = {
    height: Proptypes.string.isRequired
}

export default footer