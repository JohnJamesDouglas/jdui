import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './paragraph.scss'

const paragraph = props => {
    paragraph.propTypes = {
        align : PropTypes.oneOf(['center','left','right','justify']).isRequired
    }
    let paragraphClass = classNames({
        'paragraph': true,
        'paragraph--label': props.label,
        [`paragraph--${props.align}`]: props.align
    })
    return (
        <p className={paragraphClass}>{props.children}</p>
    )
}

export default paragraph