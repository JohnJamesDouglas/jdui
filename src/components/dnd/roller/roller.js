import React, { Component } from 'react'
import Proptypes from 'prop-types'

import './roller.scss'

// Components
import Row from '../../layout/row'
import Col from '../../layout/column'

import Title from '../../text/title'
import Paragraph from '../../text/paragraph'
import Textarea from '../../text/textarea'
import Spacer from '../../effects/spacer'
import Button from '../../input/button'
import Image from '../../media/image'

import RollerButton from './rollerButton'

// Functions
import { roll } from '../../../functions/maths'

// Media
import D4 from '../media/d4'
import D6 from '../media/d6'
import D8 from '../media/d8'
import D10 from '../media/d10'
import D12 from '../media/d12'
import D20 from '../media/d20'

const breakpoints = (current, divider, max) => {
	let array = Array(0).fill()
	let c = 0
	let final = 0
	while (c < max) {
		c += divider
		array.push(c)
	}

	final = array.find((b) => {
		return current <= b
	})

	return final
}

export default class Roller extends Component {
	constructor(props) {
		super(props)
		this.state = {
			numDice: this.props.numDice,
			maxRoll: 6,
			minDice: 1,
			maxDice: 20,
			result: null,
			currentDice: [4, 6, 8, 10, 12, 20],
			diceIcons: [<D4 />, <D6 />, <D8 />, <D10 />, <D12 />, <D20 />],
			prevResults: Array(0).fill(),
			historyLimit: this.props.historyLimit,
			delay: this.props.delay
		}
		this.rollDice = this.rollDice.bind(this)
	}
	rollDice() {
		const {
			state: {
				numDice,
				maxRoll
			}
		} = this
		let rolls = Array(numDice).fill().map((_, i) => roll(maxRoll))
		let newPrevious = { result: rolls, maxRoll: maxRoll, numDice: numDice, total: rolls.reduce((a, b) => a + b, 0) }
		// State's historyLimit is reduced by one to correctly slice history to the intended value
		this.setState((state) => ({ result: rolls, prevResults: [newPrevious, ...state.prevResults.slice(0, (state.historyLimit - 1))] }))
	}
	wheelChangeNumDice = (e) => {
		e.deltaY > 0 ? this.decrementNumDice() : this.incrementNumDice()
	}
	decrementNumDice = () => {
		const { state: { numDice, minDice } } = this
		this.setState({ numDice: numDice > minDice ? numDice - 1 : minDice, result: null });
	}
	incrementNumDice = () => {
		const { state: { numDice, maxDice } } = this
		this.setState({ numDice: numDice < maxDice ? numDice + 1 : maxDice, result: null });
	}
	selectDie = die => {
		this.setState({ maxRoll: die, result: null })
	}
	rerollDie = index => {
		const { state: { result, maxRoll, delay } } = this

		let reroll = result.map((_, i) => i === index ? roll(maxRoll) : _)
		// Delay the state update until the animation has finished
		setTimeout(() => this.setState({ result: reroll }), delay)
	}
	render() {
		const {
			state: {
				numDice,
				currentDice,
				maxRoll,
				maxDice,
				result,
				prevResults,
				diceIcons,
				delay
			},
			props: {
				reroll
			},
			decrementNumDice,
			incrementNumDice,
			wheelChangeNumDice,
			selectDie,
			rollDice,
			rerollDie
		} = this

		return (
			<div className='roller'>
				<Row>
					<Col s={12} m={12} l={12} gutters>
						<Paragraph align='center'>Number of dice</Paragraph>
					</Col>
				</Row>
				<Row>
					<div className='roller-num-dice'>
						<Col s={4} m={4} l={4} gutters>
							<Button click={decrementNumDice}>-</Button>
						</Col>
						<Col s={4} m={4} l={4} gutters>
							<div className='roller-wheel-num-dice' onWheel={(e) => wheelChangeNumDice(e)}>
								<Paragraph align='center'>{numDice}</Paragraph>
							</div>
						</Col>
						<Col s={4} m={4} l={4} gutters>
							<Button click={incrementNumDice}>+</Button>
						</Col>
					</div>
				</Row>
				<Row>
					{
						currentDice.map((c, i) => {
							return (
								<Col key={i} s={2} m={2} l={2} gutters>
									<Spacer height='2vh' />
									<div className={maxRoll === c ? 'roller-output max-roll' : 'roller-output'} onClick={selectDie.bind(this, c)}>
										<div className='roller-output-header'>
											<Paragraph align='center'>{`D${c}`}</Paragraph>
										</div>
										<div className='svg-dice'>
											{diceIcons[i]}
										</div>
									</div>
								</Col>
							)
						})
					}
				</Row>
				<Row>
					<Col s={12} m={12} l={12} gutters>
						<Spacer height='2vh' />
						<Button click={rollDice}>ROLL</Button>
						<Spacer height='2vh' />
					</Col>
				</Row>
				<Row>
					{
						result !== null ?
							<Col s={12} m={12} l={12} gutters>
								<div className='roller-display'>
									{
										Array(maxDice).fill().map((d, i) => {
											return (
												i < result.length ?
													<RollerButton key={i} click={() => rerollDie(i)} icon={diceIcons[currentDice.indexOf(maxRoll)]} delay={delay} reroll={reroll} animated>{result[i]}</RollerButton>
													: i < breakpoints(numDice, 5, maxDice) ? <RollerButton key={i} click={() => { }} icon={null}>{diceIcons[currentDice.indexOf(maxRoll)]}</RollerButton> : null
											)
										})
									}
								</div>
							</Col>
							: null
					}
				</Row>
				{
					prevResults.length !== 0 ?
						<React.Fragment>
							<Row>
								<Col s={12} m={12} l={12} gutters>
									<Paragraph align='center' label>Total: { result !== null ? result.reduce((a, b) => a + b, 0) : null }</Paragraph>
								</Col>
							</Row>
							<Row>
								<Col s={9} m={9} l={9} gutters>
									<Paragraph align='center'>Rolls</Paragraph>
								</Col>
								<Col s={1} m={1} l={1} gutters>
									<Paragraph align='center'>Dice</Paragraph>
								</Col>
								<Col s={1} m={1} l={1} gutters>
									<Paragraph align='center'>Max</Paragraph>
								</Col>
								<Col s={1} m={1} l={1} gutters>
									<Paragraph align='center'>Total</Paragraph>
								</Col>
							</Row>
							<Row>
								{
									prevResults.map((pr, i) => {
										return (
											<React.Fragment key={i}>
												<Col s={9} m={9} l={9} gutters>
													<div key={`rolls-${i}`} className='previous-rolls'>
														{
															pr.result.map((r, j) => {
																return (
																	<div className={`previous-roll ${r === pr.maxRoll ? 'max-roll' : ''}`} key={`roll-${j}`}>
																		{r}
																	</div>
																)
															})
														}
													</div>
												</Col>
												<Col s={1} m={1} l={1} gutters>
													<div key={`num-${i}`}>
														<div className='previous-roll-num-dice'>
															{pr.numDice}
														</div>
													</div>
												</Col>
												<Col s={1} m={1} l={1} gutters>
													<div key={`max-${i}`}>
														<div className='previous-roll-max-roll'>
															{pr.maxRoll}
														</div>
													</div>
												</Col>
												<Col s={1} m={1} l={1} gutters>
													<div key={`total-${i}`}>
														<div className='previous-roll-max-roll'>
															{pr.total}
														</div>
													</div>
												</Col>
											</React.Fragment>
										)
									})
								}
							</Row>
						</React.Fragment>
						: null
				}
			</div>
		)
	}
}

Roller.propTypes = {
	numDice: Proptypes.number.isRequired,
	historyLimit: Proptypes.number.isRequired,
	reroll: Proptypes.bool.isRequired,
	delay: Proptypes.number.isRequired
}