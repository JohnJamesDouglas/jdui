import React, { Component } from 'react'
import Proptypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSkull, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faCircle, faClock } from '@fortawesome/free-regular-svg-icons'

library.add(faSkull, faHeart, faCircle, faClock)

import './sheet.scss'

// Components
import HighlightedTextarea from '../../text/highlightedTextarea'
import Row from '../../layout/row'
import Col from '../../layout/column'

import Title from '../../text/title'
import Paragraph from '../../text/paragraph'
import Textarea from '../../text/textarea'
import Button from '../../input/button'
import ButtonGroup from '../../input/buttonGroup'
import Input from '../../input/input'
import Dropdown from '../../input/dropdown'
import ProgressBar from '../../effects/progressBar'
import Spacer from '../../effects/spacer'
import Checkbox from '../../input/checkbox'
import Radio from '../../input/radio'
import OptionGroup from '../../input/optionGroup'
import Accordion from '../../layout/accordion/accordion'
import AccordionHeader from '../../layout/accordion/accordionHeader'

// Data
import Player from '../../../data/player.json'
import Levels from '../../../data/levels.json'
import Alignments from '../../../data/alignments.json'

// Functions
import { calcAttributeModifier } from '../../../functions/maths'
import { shortenAttributeName } from '../../../functions/text'

// Media
import Copper from '../media/copper'
import Silver from '../media/silver'
import Electrum from '../media/electrum'
import Gold from '../media/gold'
import Platinum from '../media/platinum'

export default class Sheet extends Component {
	constructor(props) {
		super(props)
		this.state = {
			player: Player,
			levels: Levels,
			alignments: Alignments,
			moneyIcons: [<Copper />, <Silver />, <Electrum />, <Gold />, <Platinum />],
			equipmentSearchValue: '',
			proficiencesLanguagesSearchValue: '',
			featuresTraitsSearchValue: ''
		}
	}
	handleInput = (name, data) => {
		const { player, levels } = this.state
		console.log(`name=${name} data=${data}`)
		switch (name) {
			// Info
			case 'character name':
				this.setState((state, props) => ({ player: { ...state.player, Info: { ...state.player.Info, ["Character Name"]: data } } }))
				break;
			case 'player name':
				this.setState((state, props) => ({ player: { ...state.player, Info: { ...state.player.Info, ["Player Name"]: data } } }))
				break;
			case 'class':
				this.setState((state, props) => ({ player: { ...state.player, Info: { ...state.player.Info, Class: data } } }))
				break;
			case 'level':
				// Level is handled in the increment / decrement functions
				break;
			case 'background':
				this.setState((state, props) => ({ player: { ...state.player, Info: { ...state.player.Info, Background: data } } }))
				break;
			case 'race':
				this.setState((state, props) => ({ player: { ...state.player, Info: { ...state.player.Info, Race: data } } }))
				break;
			case 'alignment':
				this.setState((state, props) => ({ player: { ...state.player, Info: { ...state.player.Info, Alignment: data } } }))
				break;
			case 'experience':
				this.setState((state, props) => ({ player: { ...state.player, Info: { ...state.player.Info, ["Experience Points"]: data } } }))
				break;
			// Attributes
			case 'strength':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Attributes: { ...state.player.Attributes, Strength: Number(data) },
						Skills: state.player.Skills.map(skill => { return skill.Attribute === 'Strength' ? { ...skill, Bonus: calcAttributeModifier(Number(data)) } : skill })
					}
				}))
				break;
			case 'dexterity':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Attributes: { ...state.player.Attributes, Dexterity: Number(data) },
						Skills: state.player.Skills.map(skill => { return skill.Attribute === 'Dexterity' ? { ...skill, Bonus: calcAttributeModifier(data) } : skill })
					}
				}))
				break;
			case 'constitution':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Attributes: { ...state.player.Attributes, Constitution: Number(data) },
						Skills: state.player.Skills.map(skill => { return skill.Attribute === 'Constitution' ? { ...skill, Bonus: calcAttributeModifier(data) } : skill })
					}
				}))
				break;
			case 'intelligence':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Attributes: { ...state.player.Attributes, Intelligence: Number(data) },
						Skills: state.player.Skills.map(skill => { return skill.Attribute === 'Intelligence' ? { ...skill, Bonus: calcAttributeModifier(data) } : skill })
					}
				}))
				break;
			case 'wisdom':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Attributes: { ...state.player.Attributes, Wisdom: Number(data) },
						Skills: state.player.Skills.map(skill => { return skill.Attribute === 'Wisdom' ? { ...skill, Bonus: calcAttributeModifier(data) } : skill })
					}
				}))
				break;
			case 'charisma':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Attributes: { ...state.player.Attributes, Charisma: Number(data) },
						Skills: state.player.Skills.map(skill => { return skill.Attribute === 'Charisma' ? { ...skill, Bonus: calcAttributeModifier(data) } : skill })
					}
				}))
				break;
			// Skills

			// Skills checkboxes
			case 'check-acrobatics':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => {  return skill.Name === 'Acrobatics' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-animal handling':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Animal Handling' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-arcana':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Arcana' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-athletics':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Athletics' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-deception':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Deception' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-history':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'History' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-insight':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Insight' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-intimidation':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Intimidation' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-investigation':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Investigation' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-medicine':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Medicine' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-nature':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Nature' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-perception':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Perception' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-performance':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Performance' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-persuasion':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Persuasion' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-religion':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Religion' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-sleight of hand':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Sleight Of Hand' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-stealth':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Stealth' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			case 'check-survival':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Skills: state.player.Skills.map(skill => { return skill.Name === 'Survival' ? { ...skill, Proficient: !skill.Proficient } : skill })
					}
				}))
				break;
			// Miscellaneous
			case 'inspiration':
				this.setState((state, props) => ({ player: { ...state.player, ["Extra Modifiers"]: { ...player["Extra Modifiers"], Inspiration: Number(data) } } }))
				break;
			case 'proficiency bonus':
				// This is set by level and is therefore done in increment / decrement level
				break;
			case 'passive wisdom':
				this.setState((state, props) => ({ player: { ...state.player, ["Extra Modifiers"]: { ...player["Extra Modifiers"], ["Passive Wisdom"]: Number(data) } } }))
				break;
			case 'current':
				this.setState((state, props) => ({ player: { ...state.player, Hitpoints: { ...state.player.Hitpoints, Current: Number(data) } } }))
				break;
			case 'max':
				this.setState((state, props) => ({ player: { ...state.player, Hitpoints: { ...state.player.Hitpoints, Max: Number(data) } } }))
				break;
			case 'temporary':
				this.setState((state, props) => ({ player: { ...state.player, Hitpoints: { ...state.player.Hitpoints, Temporary: Number(data) } } }))
				break;
			// Saves
			case 'deathSaves':
				this.setState((state, props) => ({
					player: {
						...state.player,
						['Death Saves']: { ...state.player['Death Saves'], [data[0]]: Object.assign([...state.player['Death Saves'][data[0]]], { [data[1]]: !state.player['Death Saves'][data[0]][data[1]] }) }
					}
				}))
				break;
			// Money
			case 'copper':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Money: { ...state.player.Money, Copper: Number(data) }
					}
				}))
				break;
			case 'silver':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Money: { ...state.player.Money, Silver: Number(data) }
					}
				}))
				break;
			case 'electrum':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Money: { ...state.player.Money, Electrum: Number(data) }
					}
				}))
				break;
			case 'gold':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Money: { ...state.player.Money, Gold: Number(data) }
					}
				}))
				break;
			case 'platinum':
				this.setState((state, props) => ({
					player: {
						...state.player,
						Money: { ...state.player.Money, Platinum: Number(data) }
					}
				}))
				break;
			// Equipment
			case 'equipment':
				this.setState((state, props) => ({
					equipmentSearchValue: data
				}))
				break;
			case 'txta-equipment':
				this.setState((state, props) => ({
					player: {
						...state.player, Equipment: data
					}
				}))
				break;
			// Proficiences&Languages
			case 'proficiencesLanguages':
				this.setState((state, props) => ({
					proficiencesLanguagesSearchValue: data
				}))
				break;
			case 'txta-proficiencesLanguages':
				this.setState((state, props) => ({
					player: {
						...state.player, ['Proficiences&Languages']: data
					}
				}))
				break;
			// Features&Languages
			case 'featuresTraits':
				this.setState((state, props) => ({
					featuresTraitsSearchValue: data
				}))
				break;
			case 'txta-featuresTraits':
				this.setState((state, props) => ({
					player: {
						...state.player, ['Features&Traits']: data
					}
				}))
				break;
			default:
				console.log(`handleInput error supplied: ${JSON.stringify(name)} - ${JSON.stringify(data)}`)
		}
	}
	highlighting = (type) => {
		const { 
			state: { equipmentSearchValue, proficiencesLanguagesSearchValue, featuresTraitsSearchValue }
		} = this
		switch (type) {
			case 'equipment':
				let e = new RegExp(`(${equipmentSearchValue})`, ['ig']);
				return e
			case 'proficiencesLanguages':
				let p = new RegExp(`(${proficiencesLanguagesSearchValue})`, ['ig']);
				return p
			case 'featuresTraits':
				let f = new RegExp(`(${featuresTraitsSearchValue})`, ['ig']);
				return f
			default:
				console.log(`highlighting error supplied: ${JSON.stringify(type)}`)
		}
	}
	decrementLevel = () => {
		this.setState((state, props) => ({
			player: {
				...state.player,
				Info: { ...state.player.Info, Level: state.player.Info.Level > 1 ? (state.player.Info.Level - 1) : 1 },
				["Extra Modifiers"]: {
					...state.player["Extra Modifiers"],
					["Proficiency Bonus"]: state.levels.filter(l => { if ((l.Level === (state.player.Info.Level > 1 ? (state.player.Info.Level - 1) : 1))) { return l } })[0]['Proficiency Bonus']
				}
			}
		}))
	}
	incrementLevel = () => {
		this.setState((state, props) => ({
			player: {
				...state.player,
				Info: { ...state.player.Info, Level: state.player.Info.Level < 20 ? (state.player.Info.Level + 1) : 20 },
				["Extra Modifiers"]: {
					...state.player["Extra Modifiers"],
					["Proficiency Bonus"]: state.levels.filter(l => { if (l.Level === Number(state.player.Info.Level + 1)) { return l }})[0]['Proficiency Bonus']
				}
			}
		}))
	}
	render() {
		const {
			state: { player, levels, alignments, moneyIcons, equipmentSearchValue, proficiencesLanguagesSearchValue, featuresTraitsSearchValue },
			handleInput, highlighting, decrementLevel, incrementLevel
		} = this
		return (
			<div className='sheet'>
				<Accordion allowMultipleOpen>
					<div label='Info'>
						<AccordionHeader header>
							<Paragraph align='left' label={true}>{player.Info['Player Name']} {player.Info['Player Name'] && player.Info['Character Name'] !== '' ? '-' : null} {player.Info['Character Name']}</Paragraph>
						</AccordionHeader>
						<Row>
							<Col s={12} m={12} l={12}>
								<Col s={12} m={6} l={6} gutters>
									<Paragraph align='left' label={true}>Player Name</Paragraph>
								</Col>
								<Col s={12} m={6} l={6} gutters>
									<Input type='text' align='left' value={player.Info['Player Name']} placeholder='Player Name' name='player name' callback={handleInput} />
								</Col>
							</Col>
						</Row>
						<Row>
							<Col s={12} m={12} l={12}>
								<Col s={12} m={6} l={6} gutters>
									<Paragraph align='left' label={true}>Character Name</Paragraph>
								</Col>
								<Col s={12} m={6} l={6} gutters>
									<Input type='text' align='left' value={player.Info['Character Name']} placeholder='Character Name' name='character name' callback={handleInput} />
								</Col>
							</Col>
						</Row>
						<Row>
							<Col s={12} m={12} l={12}>
								<Col s={12} m={6} l={6} gutters>
									<Paragraph align='left' label={true}>Class</Paragraph>
								</Col>
								<Col s={12} m={6} l={6} gutters>
									<Input type='text' align='left' value={player.Info.Class} placeholder='Class' name='class' callback={handleInput} />
								</Col>
							</Col>
						</Row>
						<Row>
							<Col s={12} m={12} l={12}>
								<Col s={12} m={6} l={6} gutters>
									<Paragraph align='left' label={true}>Background</Paragraph>
								</Col>
								<Col s={12} m={6} l={6} gutters>
									<Input type='text' align='left' value={player.Info.Background} placeholder='Background' name='background' callback={handleInput} />
								</Col>
							</Col>
						</Row>
						<Row>
							<Col s={12} m={12} l={12}>
								<Col s={12} m={6} l={6} gutters>
									<Paragraph align='left' label={true}>Race</Paragraph>
								</Col>
								<Col s={12} m={6} l={6} gutters>
									<Input type='text' align='left' value={player.Info.Race} placeholder='Race' name='race' callback={handleInput} />
								</Col>
							</Col>
						</Row>
						<Row>
							<Col s={12} m={12} l={12}>
								<Col s={12} m={6} l={6} gutters>
									<Paragraph align='left' label={true}>Alignment</Paragraph>
								</Col>
								<Col s={12} m={6} l={6} gutters>
									<Dropdown items={alignments.map(s => { return s })} initial='Select' name='alignment' callback={handleInput} />
								</Col>
							</Col>
						</Row>
						<Row>
							<Col s={12} m={12} l={12}>
								<Col s={12} m={6} l={6} gutters>
									<Paragraph align='left' label={true}>Level</Paragraph>
								</Col>
								<Col s={12} m={6} l={6} gutters>
									<Col s={4} m={4} l={4}>
										<Button click={() => decrementLevel()}>-</Button>
									</Col>
									<Col s={4} m={4} l={4} gutters>
										<Paragraph align='center' label={true}>{player.Info.Level}</Paragraph>
									</Col>
									<Col s={4} m={4} l={4}>
										<Button click={() => incrementLevel()}>+</Button>
									</Col>
								</Col>
							</Col>
						</Row>
						<Row>
							<Col s={12} m={12} l={12}>
								<Col s={12} m={6} l={6} gutters>
									<Paragraph align='left' label={true}>Experience Points</Paragraph>
								</Col>
								<Col s={12} m={6} l={6} gutters>
									<Col s={4} m={4} l={4}>
										<Input type='number' align='center' value={player.Info['Experience Points']} placeholder='EXP' name='experience' callback={handleInput} />
									</Col>
									<Col s={4} m={4} l={4}>
										<Paragraph align='center' label={true}> /</Paragraph>
									</Col>
									<Col s={4} m={4} l={4}>
										<Paragraph align='center' label={true}> {levels.filter(l => { if (l.Level === (player.Info.Level) + 1) { return l } })[0]['Experience Points']}</Paragraph>
									</Col>
									{
										Number(player.Info['Experience Points']) !== 0 ?
											<Col s={12} m={12} l={12}>
												<Spacer height='1vh' />
												<ProgressBar current={Number(player.Info['Experience Points'])} max={Number(levels.filter(l => { if (l.Level === (player.Info.Level) + 1) { return l } })[0]['Experience Points'])} />
											</Col>
										: null
									}
								</Col>
							</Col>
						</Row>
					</div>
					<div label='Attributes'>
						<Row>
							<Col s={12} m={12} l={12}>
								{
									Object.keys(player.Attributes).map((attribute, i) => {
										return (
											<Col key={i} s={6} m={4} l={4} gutters>
												<Paragraph align='center'>{attribute}</Paragraph>
												<Input type='number' align='center' value={player.Attributes[attribute]} placeholder={attribute} name={attribute.toLowerCase()} callback={handleInput} />
											</Col>
										)
									})
								}
							</Col>
						</Row>
					</div>
					<div label='Skills'>
						<Row>
							<Col s={12} m={12} l={12}>
								{
									Object.values(player.Skills).map((skill, i) => {
										return (
											<Col key={i} s={12} m={4} l={4} gutters>
												<Col s={12} m={12} l={12}>
													<div className='skills__container'>
														<Checkbox checked={skill.Proficient} name={`check-${skill.Name.toLowerCase()}`} callback={handleInput} />
														<Paragraph align='center'>{skill.Name} ({shortenAttributeName(skill.Attribute)})</Paragraph>
													</div>
												</Col>
												<Col s={12} m={12} l={12}>
													<Paragraph align='center' label>{skill.Bonus + Number(skill.Proficient ? player['Extra Modifiers']['Proficiency Bonus'] : 0) > -1 ? '+' : ''}{skill.Bonus + Number(skill.Proficient ? player['Extra Modifiers']['Proficiency Bonus'] : 0)}</Paragraph>
												</Col>
											</Col>
										)
									})
								}
							</Col>
						</Row>
					</div>
					<div label='Miscellaneous'>
						<Row>
							<Col s={12} m={12} l={12}>
								{
									Object.keys(player['Extra Modifiers']).map((modifier, i) => {
										return (
											<Col key={i} s={4} m={4} l={4} gutters>
												<Paragraph align='center'>{modifier}</Paragraph>
												{
													modifier === 'Proficiency Bonus' ?
														<Paragraph align='center' label>+{player['Extra Modifiers'][modifier]}</Paragraph>
														: <Input type='number' align='center' value={player['Extra Modifiers'][modifier]} placeholder={modifier} name={modifier.toLowerCase()} callback={handleInput} />
												}
											</Col>
										)
									})
								}
							</Col>
						</Row>
					</div>
					<div label='Hitpoints'>
						<AccordionHeader header>
							{
								(player.Hitpoints.Current && player.Hitpoints.Max !== 1) && <ProgressBar current={Number(player.Hitpoints.Current)} max={Number(player.Hitpoints.Max)} temporary={Number(player.Hitpoints.Temporary)} />
							}
							{
								//player.Hitpoints.Temporary !== 0 && <React.Fragment><FontAwesomeIcon icon='heart' style={{ color: 'red' }} /><FontAwesomeIcon icon={['far', 'clock']} /><Paragraph align='left'>{player.Hitpoints.Temporary}</Paragraph></React.Fragment>
							}
						</AccordionHeader>
						<Row>
							<Col s={12} m={12} l={12}>
								<Col s={6} m={6} l={6} gutters>
									<Paragraph align='center'>Current</Paragraph>
									<Input type='number' align='left' value={player.Hitpoints.Current} placeholder='current' name='current' callback={handleInput} />
								</Col>
								<Col s={6} m={6} l={6} gutters>
									<Paragraph align='center'>Max</Paragraph>
									<Input type='number' align='left' value={player.Hitpoints.Max} placeholder='max' name='max' callback={handleInput} />
								</Col>
								<Col s={12} m={12} l={12} gutters>
									<Spacer height='1vh' />
									<Spacer height='5vh'><ProgressBar current={Number(player.Hitpoints.Current)} max={Number(player.Hitpoints.Max)} temporary={Number(player.Hitpoints.Temporary)} /></Spacer>
								</Col>
							</Col>
							<Col s={6} m={6} l={6} offsetS={3} offsetM={3} offsetL={3}>
								<Paragraph align='center' label={true}>Temporary Hitpoints</Paragraph>
								<Input type='number' align='left' value={player.Hitpoints.Temporary} placeholder='temporary' name='temporary' callback={handleInput} />
							</Col>
						</Row>
					</div>
					<div label='Death Saves'>
						<AccordionHeader header>
							{
								player['Death Saves'].Successes.every(x => x === false) && player['Death Saves'].Failures.every(x => x === false) ?
									null
									: <React.Fragment>
										{
											Object.keys(player['Death Saves']).map((saves, i) => {
												return (
													player['Death Saves'][saves].map((save, j) => {
														return (
															<React.Fragment key={`type-${j}`}>
																{
																	i === 0 ?
																		save ? <FontAwesomeIcon icon='heart' style={{ color: 'red' }} /> : <FontAwesomeIcon icon={['far', 'circle']} />
																		: save ? <FontAwesomeIcon icon='skull' style={{ color: 'white' }} /> : <FontAwesomeIcon icon={['far', 'circle']} />
																}
															</React.Fragment>
														)
													})
												)
											})
										}
									</React.Fragment>
							}
						</AccordionHeader>
						<Row>
							<Col s={12} m={12} l={12}>
								{
									Object.keys(player['Death Saves']).map((saves, i) => {
										return (
											<Col key={i} s={6} m={6} l={6} gutters>
												<Paragraph align='center'>{saves}</Paragraph>
												{
													player['Death Saves'][saves].map((save, j) => {
														return (
															<Col key={j} s={4} m={4} l={4} gutters>
																<Button click={() => handleInput('deathSaves', [saves, j])}>
																	{
																		i === 0 ?
																			save ? <FontAwesomeIcon icon='heart' size='3x' style={{ color: 'red' }} /> : <FontAwesomeIcon icon={['far', 'circle']} size='3x' />
																			: save ? <FontAwesomeIcon icon='skull' size='3x' style={{ color: 'white' }} /> : <FontAwesomeIcon icon={['far', 'circle']} size='3x' />
																	}
																</Button>
															</Col>
														)
													})
												}
											</Col>
										)
									})
								}
							</Col>
						</Row>
					</div>
					<div label='Money'>
						<AccordionHeader header>
							{
								Object.keys(player.Money).map((coin, i) => {
									return player.Money[coin] > 0 ?
										<React.Fragment key={i}>
											<Paragraph align='left'>{player.Money[coin]}</Paragraph>
											{moneyIcons[i]}
										</React.Fragment>
										: null
								})
							}
						</AccordionHeader>
						<Row>
							<Col s={10} m={10} l={10} offsetS={1} offsetM={1} offsetL={1}>
								{
									Object.keys(player.Money).map((money, i) => {
										return (
											<Row key={`money-row-${i}`}>
												<Col key={`money-col-${i}`} s={12} m={12} l={12}>
													<Col s={3} m={3} l={3}>
														<Paragraph align='left' label={true}>
															{money}
														</Paragraph>
													</Col>
													<Col s={9} m={9} l={9}>
														<Input type='number' icon={moneyIcons[i]} align='left' value={player.Money[money]} placeholder={money} name={money.toLowerCase()} callback={handleInput} />
													</Col>
												</Col>
											</Row>
										)
									})
								}
							</Col>
						</Row>
					</div>
					<div label='Equipment'>
						<AccordionHeader header>
						</AccordionHeader>
						<Row>
							<Col s={12} m={12} l={12} gutters>
								<Input type='text' icon={<FontAwesomeIcon icon='search' />} align='left' value={equipmentSearchValue} placeholder='search equipment' name='equipment' callback={handleInput} />
								<Spacer height='1vh' />
								<HighlightedTextarea value={player.Equipment} highlight={() => highlighting('equipment')} resize placeholder='equipment' name='txta-equipment' callback={handleInput} />
							</Col>
						</Row>
					</div>
					<div label='Proficiences & Languages'>
						<AccordionHeader header>
						</AccordionHeader>
						<Row>
							<Col s={12} m={12} l={12} gutters>
								<Input type='text' icon={<FontAwesomeIcon icon='search' />} align='left' value={proficiencesLanguagesSearchValue} placeholder='search proficiences & languages' name='proficiencesLanguages' callback={handleInput} />
								<Spacer height='1vh' />
								<HighlightedTextarea value={player['Proficiences&Languages']} highlight={() => highlighting('proficiencesLanguages')} resize placeholder='proficiences and languages' name='txta-proficiencesLanguages' callback={handleInput} />
							</Col>
						</Row>
					</div>
					<div label='Features & Traits'>
						<AccordionHeader header>
						</AccordionHeader>
						<Row>
							<Col s={12} m={12} l={12} gutters>
								<Input type='text' icon={<FontAwesomeIcon icon='search' />} align='left' value={featuresTraitsSearchValue} placeholder='search features & traits' name='featuresTraits' callback={handleInput} />
								<Spacer height='1vh' />
								<HighlightedTextarea value={player['Features&Traits']} highlight={() => highlighting('featuresTraits')} resize placeholder='proficiences & languages' name='txta-featuresTraits' callback={handleInput} />
							</Col>
						</Row>
					</div>
				</Accordion>
			</div>
		);
	}
}

Sheet.propTypes = {}