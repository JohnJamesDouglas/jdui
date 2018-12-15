import React from 'react'
import PropTypes from 'prop-types'

import './navbarShelf.scss'

const navbarShelf = props => {
    let shelfClasses = 'navbar__shelf'
    if (props.show) {
        shelfClasses = 'navbar__shelf open'
    }
    return (
        <nav className={shelfClasses}>
            {props.children}
        </nav>
    )
}

export default navbarShelf