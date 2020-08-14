import React from 'react'

import { Link } from 'react-router-dom'

import successBackground from '../../assets/images/success-background.svg'


import './styles.css'

interface CommonCaseProps {
	mainImg: any
	title?: string
	subtitle: string
	button?: string
	route?: any
}

const CommonCase: React.FC<CommonCaseProps> = ( props ) => {
	return (
		<div id="logo-container" style={{backgroundImage: "url(" + successBackground +")"}}>
			<img src={props.mainImg} alt="Proffy" />
			{props.title && <h1>{props.title}</h1>}
			<h2>{props.subtitle}</h2>
			{props.button && <Link style={{textDecoration: "none"}} to={props.route}><button>{props.button}</button></Link>}
		</div>
	)
}

export default CommonCase