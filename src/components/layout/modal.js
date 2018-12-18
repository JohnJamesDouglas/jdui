import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './modal.scss'
import Button from '../input/button'
import Fader from '../effects/fader'

export default class Modal extends Component {
	toggle = () => {
		this.props.callback()
	}
	render() {
		const {
			props: {
				open,
				fade,
				opacity,
				children
			},
			toggle
		} = this
		return (
			<React.Fragment>
				<div className='modal' style={{ display: open ? 'flex' : 'none' }}>
					{
						open ?
							<React.Fragment>
								<div className='modal__contents'>
									{children}									
								</div>
								<Button click={() => toggle()}>Close</Button>
							</React.Fragment>
						: null
					}

				</div>
				{
					open && fade ? <Fader click={() => toggle()} opacity={opacity} /> : null
				}
			</React.Fragment>
		)
	}
}

Modal.propTypes = {
	fade: PropTypes.bool.isRequired
}