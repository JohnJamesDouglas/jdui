import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './appWrapper.scss'

class AppWrapper extends Component {
	componentWillMount() {
		this.unlisten = this.props.history.listen((location, action) => {
			console.log('on route change')
			this.props.onRouteChange()
		})
	}
	componentWillUnmount() {
		this.unlisten()
	}
	render() {
		const { props: { children } } = this
		return (
			<React.Fragment>
				<div id='appWrapper'>
					<div id='appWrapper__contents'>
					{
						React.Children.map(children, (child) => {
							return child.type.name !== 'footer' ? child : null
						})
					}
					</div>				
					{
						React.Children.map(children, (child) => {
							return child.type.name === 'footer' ? child : null
						})
					}
				</div>
			</React.Fragment>
		)
	}
}

export default withRouter(AppWrapper)