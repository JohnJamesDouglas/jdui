import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './initiativeBar.scss'

import Input from '../../input/input'
import Paragraph from '../../text/paragraph'

export default class InitiativeBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: this.props.initiativeValue
		}
	}
	handleInput = (name, data) => {
		const {
			props: {
				index,
				callback
			}
		} = this
		console.log(`name=${name} data=${data}`)

		this.setState({ value: data })

		callback(index, data)
	}
	handleClick = index => {
		const {
			props: {
				deleteItem
			}
		} = this
		deleteItem(index)
	}
	render() {
		const {
			state: {
				value
			},
			props: {
				id,
				index,
				type,
				children
			},
			handleInput,
			handleClick
		} = this

		let initBarClass = classNames({
			'initiativeBar': true,
			'player': type === 'player',
			'npc': type === 'npc',
			'dm': type === 'dm'
		})

		return (
			<Draggable key={index} index={index} draggableId={id}>
				{(provided, snapshot) => (
					<div className={initBarClass + `${snapshot.isDragging ? ' dragging' : ''}`}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<FontAwesomeIcon icon='chevron-up' />
						<FontAwesomeIcon icon='chevron-down' />
						<div className='initiativeBar__left'>
							<Paragraph align='left' label>{index + 1}</Paragraph>
							<Input type='number' value={value} placeholder='Initiative' name='initiative' callback={handleInput} />
						</div>
						<div className='initiativeBar__right'>							
							<Paragraph align='left' label>{children} <FontAwesomeIcon icon='times' onClick={() => handleClick(index)} /></Paragraph>
						</div>
					</div>
				)}
			</Draggable>
		)
	}
}