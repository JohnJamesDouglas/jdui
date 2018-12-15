import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './navbar.scss'

import NavbarItem from './navbarItem'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames'

library.add(faBars, faTimes)

import './navbar.scss';

class Navbar extends Component {
	constructor() {
		super()
		this.state = { shadow: false }
		this.handleScroll = this.handleScroll.bind(this)
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
	handleScroll() {
		this.setState({ shadow: window.pageYOffset !== 0 })
	}
	render() {
		const { state: { shadow }, props: { shelfClickHandler, show, title, children } } = this
		let navClass = classNames({
			'navbar__container': true,
			'shadow': shadow
		})
		return (
			<React.Fragment>
				<header className={navClass}>
					<nav className='navbar'>
						<div className='navbar__navigation--left'>
							{
								show ? <FontAwesomeIcon icon='times' onClick={shelfClickHandler} size='2x' /> : <FontAwesomeIcon icon='bars' onClick={shelfClickHandler} size='2x' />
							}
							<NavbarItem condensed={false}>{title}</NavbarItem>
						</div>
						<div className='navbar__navigation--right'>
							{children}
						</div>
					</nav>
				</header>
				<div className='navbar__content-spacer'></div>
			</React.Fragment>
		)
	}
}

export default Navbar



// export default class Navbar extends Component {
//   constructor(props) {
//     super(props)
//     // height as integer under 100 which will be used a percentage
//     this.state = { height: this.props.navbarHeight, shelfButtonIconOpen: <FontAwesomeIcon icon='bars' size='3x'/>, shelfButtonIconClosed: <FontAwesomeIcon icon='times' size='3x'/> }
//   }
//   toggleShelf() {
//     // Change the button
//     this.setState({ buttonIcon: this.state.buttonIcon === this.state.shelfButtonIconOpen ? this.state.shelfButtonIconClosed : this.state.shelfButtonIconOpen })
//     // Toggle the shelf
//     this.props.shelfToggle()
//   }
//   render() {
//     return (
//         <nav className='navbar' style={{ height: this.state.height+'%' }}>
//           <button className={this.props.navbarBrandImage === null ? 'navbar-button navbar-button-margin' : 'navbar-button'} onClick={this.toggleShelf.bind(this)}>
//             <div className='navbar-button-icon'>
//               {this.props.shelfOpen === true ? this.state.shelfButtonIconClosed : this.state.shelfButtonIconOpen }
//             </div>
//           </button>    
//           <div className='navbar-menu'>      
//             { this.props.navbarBrandImage !== null ? <div className='navbar-brand'>{this.props.navbarBrandImage}</div> : null }
//             {
//               React.Children.map(this.props.children, function(c) {
//                 return c
//                 if(c.type.name === 'NavbarItem') {
//                   return c
//                 }
//               })
//             }
//           </div>
//           { this.props.shelfOpen === true ? 
//             // The shelf is an absolute position div over the entire viewport (excluding the navbar)
//             // height of navbar is the top and the height of the viewport (100%) minus navbarHeight is the height
//             <div className='navbar-shelf-container' style={{top: this.state.height+'%', height: 100-this.state.height+'%'}}>
//               { this.props.fade === true ? <Fader/> : null }
//               {
//                 React.Children.map(this.props.children, function(c) {
//                   if (c.type.name === 'NavbarShelf') {                    
//                     return c
//                   }
//                 })
//               }              
//             </div>
//           : null }
//         </nav>
//     );
//   }
// }

// Navbar.propTypes = {
//   navbarHeight: PropTypes.number.isRequired,
//   navbarBrandImage: PropTypes.element,
//   shelfOpen: PropTypes.bool.isRequired,
//   fade: PropTypes.bool.isRequired
// }