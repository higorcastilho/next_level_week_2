import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons"

import api from '../../services/api'
import jwtDecode from '../../services/jwtDecode'
import { isAuthenticated, getToken } from '../../services/auth'

import './styles.css'

function Landing() {
	const [ totalConnections, setTotalConnections ] = useState(0)

	const [ userInfo, setUserInfo ] = useState({ 
		avatar: '',
		name: ''
	})

	useEffect(() => {

		const isAuth = isAuthenticated()
		const token = JSON.stringify(getToken())

		if (isAuth) {
			const accountId = jwtDecode(token)
			api.get(`accounts/${accountId}`).then( res => {
				console.log(res.data[0])
				setUserInfo({
					name: res.data[0].name,
					avatar: res.data[0].avatar
				})
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
				{	userInfo.name &&	<div id="profile-header">
									<Link to="/profile">
										<img src={userInfo.avatar} alt="Foto do usuário" />
										{userInfo.name}
									</Link>
									<FontAwesomeIcon icon={faPowerOff} />
								</div>}
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