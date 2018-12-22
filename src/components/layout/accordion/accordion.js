import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AccordionBody from './accordionBody'
import ProgressBar from '../../effects/progressBar'
import './accordion.scss'

class Accordion extends Component {
    static propTypes = {
        allowMultipleOpen: PropTypes.bool,
        children: PropTypes.instanceOf(Object).isRequired
    }
    static defaultProps = {
        allowMultipleOpen: false
    }
    constructor(props) {
        super(props)
		const openSections = {}
        React.Children.forEach(this.props.children, child => {
            if (child.props.isOpen) {
				openSections[child.props.label] = true
            }
        })
		this.state = { openSections }
    }
    onClick = label => {
        const {
            props: { allowMultipleOpen },
			state: { openSections }
        } = this
        const isOpen = !!openSections[label]
        if (allowMultipleOpen) {
            this.setState({
                openSections: { ...openSections, [label]: !isOpen }
            })
        } else {
            this.setState({
                openSections: { [label]: !isOpen }
			})
		}
	}
	closeAllSections = () => {
		this.setState({ openSections: {} })
	}
    render() {
        const {
            onClick,
            props: { children },
            state: { openSections },
        } = this
        return (
            <div className='accordion'>
            {
                React.Children.map(children, child => {
                    return (
                        <AccordionBody isOpen={!!openSections[child.props.label]} label={child.props.label} onClick={onClick}>
                            {child.props.children}
                        </AccordionBody>
                    )
                })
            }
            </div>
        )
    }
}

export default Accordion