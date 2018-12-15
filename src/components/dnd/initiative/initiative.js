import React, { Component } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountUp, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'
library.add(faSortAmountUp, faSortAmountDown)

import InitiativeBar from './initiativeBar'
import Row from './../../layout/row'
import Col from './../../layout/column'
import Spacer from './../../effects/spacer'
import Input from './../../input/input'
import Button from './../../input/button'

import './initiative.scss'

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

export default class Initiative extends Component {
	constructor(props) {
		super(props)
		this.state = { items: [], value: '', nextId: 0 }
		this.onDragEnd = this.onDragEnd.bind(this)
		this.input = React.createRef()
	}
	addItem = type => {
		const {
			state: {
				value,
				nextId
			}
		} = this
		const item = { 
			id: `item-${nextId}`,
			content: value !== '' ? value : 'Default',
			initiativeValue: 0,
			type: type
		}
		this.setState(state => ({ items: [ ...state.items, item ], value: '', nextId: state.nextId + 1 }))
		this.input.current.reset()
	}
	deleteItem = id => {
		const {
			state: {
				items
			}
		} = this
		let otherItems = items.filter(item => { return item.id !== id })
		this.setState({ items: otherItems })
	}
	editItem = (index, data) => {
		const {
			state: {
				items
			}
		} = this

		let editItem = items[index]
		editItem.initiativeValue = data
		let x = items.map((item, i)=> { return i === index ? editItem : item })

		this.setState({ items: x })
	}
	sort = type => {
		console.log('sort')
		switch(type) {
			case 'asc':
				console.log(`[0] initiativeValue=${this.state.items[0].initiativeValue}`)
				// this.setState(state => ({ items: state.items.sort((a,b) => (a.initiativeValue > b.initiativeValue) ? 1 : ((b.initiativeValue > a.initiativeValue) ? -1 : 0)) }))
				this.setState(state => ({ items: state.items.sort((a,b) => parseFloat(a.initiativeValue) - parseFloat(b.initiativeValue))}))
				break;
			case 'dsc':
				this.setState(state => ({ items: state.items.sort((a,b) => parseFloat(b.initiativeValue) - parseFloat(a.initiativeValue))}))
				break;
			default:
				console.log(`sort error supplied: ${JSON.stringify(name)}`)
		}
	}
	handleInput = (name, data) => {
		this.setState({ value: data })
	}
	onDragEnd(result) {
		// dropped outside the list
		if (!result.destination) {
			return
		}

		const items = reorder(
			this.state.items,
			result.source.index,
			result.destination.index
		)

		this.setState({ items })
	}
	render() {
		const {
			state: {
				items
			},
			onDragEnd,
			handleInput,
			addItem,
			deleteItem,
			editItem,
			sort
		} = this
		return (
			<div className='initiative'>
				<Row>
					<Col s={12} m={12} l={12}>
						<Input
							type='text'
							align='left'
							value={''}
							placeholder='Name'
							name='Name'
							callback={handleInput}
							ref={this.input}
						/>
						<Spacer height='1vh' />
					</Col>
				</Row>
				<Row>			
					<Col s={12} m={4} l={4} gutters>
						<Button click={() => addItem('player')}>Add Player</Button>
					</Col>
					<Col s={12} m={4} l={4} gutters>
						<Button click={() => addItem('npc')}>Add NPC</Button>
					</Col>
					<Col s={12} m={4} l={4} gutters>
						<Button click={() => addItem('dm')}>Add DM Controlled</Button>
					</Col>
				</Row>
				<Row>
					<Spacer height='1vh' />
					<Col s={12} m={6} l={6} gutters>
						<Button click={() => sort('dsc')}><FontAwesomeIcon icon='sort-amount-down' /> Sort Descending</Button>
					</Col>
					<Col s={12} m={6} l={6} gutters>
						<Button click={() => sort('asc')}><FontAwesomeIcon icon='sort-amount-up' /> Sort Ascending</Button>
					</Col>
				</Row>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div ref={provided.innerRef}>
								{items.map((item, index) => (
									<InitiativeBar 
										key={item.id}
										id={item.id}
										index={index}
										type={item.type}
										deleteItem={() => deleteItem(item.id)}
										initiativeValue={item.initiativeValue}
										callback={editItem}
									>
										{item.content}
									</InitiativeBar>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		)
	}
}