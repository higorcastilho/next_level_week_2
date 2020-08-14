import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import api from '../../services/api'
import jwtDecode from '../../services/jwtDecode'
import { isAuthenticated, getToken } from '../../services/auth'

import './styles.css'

function Landing() {
	const [ totalConnections, setTotalConnections ] = useState(0)

	useEffect(() => {

		const isAuth = isAuthenticated()
		const token = JSON.stringify(getToken())

		if (isAuth) {
			const accountId = jwtDecode(token)
			api.get(`accounts/${accountId}`).then( res => {
				console.log(res.data[0])
			})
		}

		api.get('connections').then((res) => {
			const { total } = res.data
			setTotalConnections(total)
		})
	}, [])

	return (
		<div id="page-landing" >
			<div id="page-landing-content" className="container">
				<div className="profile-header">
					<h1>Hello</h1>
				</div>
				<div className="logo-container">
					<img src={logoImg} alt="Proffy" />
					<h2>Sua plataforma de estudos online</h2>
				</div>
				<img 
					src={landingImg} 
					alt="Plataforma de estudos Proffy" 
					className="hero-image"
				/>
				<div className="buttons-container">
					<Link to="/study" className="study">
						<img src={studyIcon} alt="Estudar" />
						Estudar
					</Link>

					<Link to="/give-classes" className="give-classes">
						<img src={giveClassesIcon} alt="Dar aulas" />
						Dar aulas
					</Link>
				</div>
				<span className="total-connections">
					Total de { totalConnections } conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
				</span>
			</div>
		</div>

	)
}

export default Landing