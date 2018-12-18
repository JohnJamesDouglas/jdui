import React, { Component } from 'react'

import Container from '../../layout/container'
import Initiative from '../../dnd/initiative/initiative'
import Roller from '../../dnd/roller/roller'
import Button from '../../input/button'
import Modal from '../../layout/modal'

import './dungeonMaster.scss'

export default class DungeonMaster extends Component {
	constructor(props) {
		super(props)
		this.state = { players: null, rollerModalOpen: false }
	}
	rollerModalToggle = () => {
		this.setState((state) => ({ rollerModalOpen: !state.rollerModalOpen }))
	}
	render() {
		const {
			state: {
				rollerModalOpen
			},
			rollerModalToggle
		} = this
		return (
			<div className='dungeonMaster'>
				<Container overflow={false} toggle>
					<div>
						<Initiative />
					</div>
					<div>
						<Button click={() => rollerModalToggle()}>Roller</Button>
						<Modal open={rollerModalOpen} fade opacity={0.3} callback={() => rollerModalToggle()}> 
							<Roller />
						</Modal>
					</div>
					<div>
						
					</div>
				</Container>
			</div>
		)
	}
}