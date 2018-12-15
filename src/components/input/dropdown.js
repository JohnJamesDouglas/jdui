import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronUp, faChevronDown)

import './dropdown.scss'

export default class Dropdown extends Component {
    constructor(props) {
        super(props)
        this.state = { isOpen: false, title: this.props.initial, initial: this.props.initial }
    }
    toggle = () => {
        const { isOpen } = this.state
        this.setState({ isOpen: !isOpen })
    }
    selectItem = (item) => {
        const { callback } = this.props 
        this.setState({ title: item, isOpen: false }, callback(this.props.name, item))
    }
    render() {
        const {
            state: { isOpen, title, initial },
            props: { items },
            toggle,
            selectItem
        } = this
        let dropdownClass = classNames({
            'dropdown__header': true,
            'open': isOpen,
            'initial': title === initial
        })
        return (
            <div className='dropdown' onClick={toggle}>
                <div className={dropdownClass}>
                    <div className='dropdown__title'>{title}</div>
                    {
                        isOpen ? <FontAwesomeIcon icon='chevron-up' /> : <FontAwesomeIcon icon='chevron-down' />
                    }
                </div>
                {
                    isOpen && <ul className='dropdown__list'>
                    {
                        items.map((item, i) => (
                            <li className='dropdown__list-item' key={i} onClick={() => selectItem(item)}>{item}</li>
                        ))
                    }
                    </ul>
                }
            </div>
        )
    }
}

Dropdown.propTypes = {
    items: PropTypes.array.isRequired
}