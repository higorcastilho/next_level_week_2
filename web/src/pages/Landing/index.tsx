import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { Context } from '../../context/AuthContext'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons"

import api from '../../services/api'
import jwtDecode from '../../services/jwtDecode'
import { isAuthenticated, getToken, logout } from '../../services/auth'

import './styles.css'

function Landing() {

	const [ totalConnections, setTotalConnections ] = useState(0)
	const [ userInfo, setUserInfo ] = useState({
		name: '',
		avatar: ''
	})

	const { user, handleUserInfo } = useContext(Context)

	useEffect(() => { 

		async function authorizedUser() {
			await handleUserInfo()
			setUserInfo({
				name: user.name, 
				avatar: user.avatar
			})
		}
		authorizedUser()
	}, [userInfo])

	async function handleLogout() {
		await logout()
		window.location.reload(false)
	}

	return (
		<div id="page-landing" >
			<div id="page-landing-content" className="container">
				{	userInfo.name  &&	<div id="profile-header">
									<Link to="/profile">
										<img src={userInfo.avatar} alt="Foto do usuário" />
										{userInfo.name}
									</Link>
									<FontAwesomeIcon 
										icon={faPowerOff} 
										className="power-off-button"
										onClick={handleLogout}
									/>
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