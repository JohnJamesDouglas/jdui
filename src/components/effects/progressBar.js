import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './progressBar.scss'

import { clamp } from '../../functions/maths'

export default class ProgressBar extends Component {
    constructor(props) {
        super(props)
        this.state = { mouseOver: false, percentage: clamp((this.props.current / this.props.max * 100), 0, 100).toFixed(2)+'%', temporaryPercentage: clamp((this.props.temporary / this.props.max * 100), 0, 100).toFixed(2)+'%' }
    }
    componentWillReceiveProps(nextProps) {
        const { percentage, temporaryPercentage } = this.state
        if (clamp((nextProps.current / nextProps.max * 100), 0, 100)+'%' !== percentage) {
            this.setState({ percentage: clamp((nextProps.current / nextProps.max * 100), 0, 100).toFixed(2)+'%' });
        }
        //if (clamp((nextProps.current / nextProps.max * 100), 0, 100)+'%' !== temporaryPercentage) {
        if (clamp((nextProps.temporary / nextProps.max * 100), 0, 100).toFixed(2)+'%' !== temporaryPercentage) {
            this.setState({ temporaryPercentage: clamp((nextProps.temporary / nextProps.max * 100), 0, 100).toFixed(2)+'%' });
        }
    }
    onMouseOver = () => {
        this.setState({ mouseOver: true })
    }
    onMouseOut = () => {
        this.setState({ mouseOver: false })
    }
    render() {
        const {
			state: { 
				mouseOver,
				percentage,
				temporaryPercentage
			},
			props: {
				temporary
			},
			onMouseOver,
			onMouseOut 
		} = this

        let progressClass = classNames({
            'progress__bar--progress': true,
            'progress__bar--capped': percentage === '100.00%',
		})

		console.log(`temporaryPercentage=${temporaryPercentage}`)
		console.log(`temporaryPercentage === '100.00%' =${temporaryPercentage === '100.00%'}`)

        let temporaryProgressClass = classNames({
            'temporary__bar--progress': true,
            'temporary__bar--capped': temporaryPercentage === '100.00%',
		})

        return (
            <div className='progress__bar' onMouseOver={() => onMouseOver()} onMouseOut={() => onMouseOut()}>
                { mouseOver ? <div className='progress__bar--text'>{percentage}{temporary ? ' ('+temporaryPercentage+')': null}</div>: null }
                <div className={progressClass} style={{ width: percentage }}/>
				{
					!!temporary &&
						<div className='temporary__bar'>
							<div className={temporaryProgressClass}  style={{ width: temporaryPercentage }} />
						</div>
				}
            </div>
        )
    }
}

ProgressBar.propTypes = {
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
}