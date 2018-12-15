import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Paragraph from '../../text/paragraph'

import './accordionBody.scss'

class AccordionBody extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    isOpen: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }
  onClick = () => {
    this.props.onClick(this.props.label)
  }
  render() {
    const { onClick, props: { isOpen, label, children } } = this
    return (
      <div className='accordionBody'>
        <div className='accordionBody__header' onClick={onClick}>
          <div className='accordionBody__items'>
            <Paragraph align='left' label={true}>{label}</Paragraph>
            {
              React.Children.map(children, child => {
                return child.props.header ? child : null
              })
            }
          </div>
          <div className='accordionBody__toggle'>
            {!isOpen && <FontAwesomeIcon icon='chevron-down' />}
            {isOpen && <FontAwesomeIcon icon='chevron-up' />}
          </div>
        </div>
        {isOpen && (
          <div className='accordionBody__body'>
            {
              React.Children.map(children, child => {
                return child.props.header ? null : child
              })
            }
          </div>
        )}
      </div>
    )
  }
}

export default AccordionBody
