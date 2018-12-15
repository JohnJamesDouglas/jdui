import React from 'react'

import './columns.scss'

import Image from '../../media/image'

import pillarL from '../media/pillar-left.png'
//import pillarL from '../../../../dist/2660d754e87cf8275c4ba53cf86db171.png'
///dist/2660d754e87cf8275c4ba53cf86db171.png'
import pillarR from '../media/pillar-right.png'
///import pillarR from '../../../../dist/f01e6d744531ce3ce4271c349754203c.png'

const columns = props => (
	<React.Fragment>
		<div className='columns columns__left'>
			<Image src={pillarL} alt='' />
		</div>
		<div className='columns columns__right'>
		<Image src={pillarR} alt='' />
		</div>
	</React.Fragment>
)

export default columns