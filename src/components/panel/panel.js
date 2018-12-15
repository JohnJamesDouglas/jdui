import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './panel.scss'

export default class Panel extends Component {
  render() {
	// TODO: THIS SHOULD BE REPLACEABLE WITH FLEXBOX ORDER / FLEX DIRECTION
	const {
		props: {
			side,
			headerWidth,
			children
		}
	} = this

    let bodyWidth = (100-headerWidth)
	
	let panelClass = classNames({
		'panel': true,
		'panel--top': side === 'top',
		'panel--bottom': side === 'bottom',
		'panel--left': side === 'left',
		'panel--right': side === 'right'
	})

    // const childrenWithProps = React.Children.map(this.props.children, (child) => {
    //   // If the child element is a <PanelHeader/> add header props
    //   if(child.type.name === 'PanelHeader') { 
    //     return React.cloneElement(child, {
    //       headerSide: headerSide,  
    //       headerWidth: headerWidth,
    //     })
    //   }
    //   // If the child element is a <PanelBody/> add body props
    //   if(child.type.name === 'PanelBody') { 
    //      return React.cloneElement(child, {
    //       bodySide: bodySide,
    //       bodyWidth: bodyWidth
    //     })
    //   }
    // })

    return (
      //<div className={panelClass}>{childrenWithProps}</div>
      <div className={panelClass}>{children}</div>
    )
  }
}

Panel.propTypes = {
  side: PropTypes.string.isRequired
}