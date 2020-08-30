import React, { useState, FormEvent, useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { Context } from '../../context/AuthContext'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'
import successBackground from '../../assets/images/success-background.svg'
import logoImg from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons"

import api from '../../services/api'
import jwtDecode from '../../services/jwtDecode'
import { isAuthenticated, getToken } from '../../services/auth'

import './styles.css'

function Profile() {

	const history = useHistory()

	const { user, handleUserInfo } = useContext(Context)

	const [ toggleModal, setToggleModal ] = useState('none')
	const [ showPage, setShowPage ] = useState('')

	const [ userId, setUserId ] = useState(0)
	const [ name, setName ] = useState('')
	const [ avatar, setAvatar ] = useState('')
	const [ whatsapp, setWhatsapp ] = useState('')
	const [ bio, setBio ] = useState('')
	const [ account_id, setAccount_id ] = useState(0)
	const [ firstName, setFirstName ] = useState('')
	const [ lastName, setLastName ] = useState('')
	const [ email, setEmail ] = useState('')

	useEffect(() => {
		
		async function authorizedUser() {
			await handleUserInfo()
				setUserId(user.userId)
				setName(user.name)
				setAvatar(user.avatar)
				setWhatsapp(user.whatsapp)
				setBio(user.bio)
				setAccount_id(user.account_id)
				setFirstName(user.firstName)
				setLastName(user.lastName)
				setEmail(user.email)
		}

		authorizedUser()
	}, [])

	async function handleUpdateUser(e: FormEvent) {
		e.preventDefault()

		const isAuth = isAuthenticated()
		const token = JSON.stringify(getToken())

		if (isAuth) {
			const accountId = jwtDecode(token)
			await api.post(`accounts-user/${accountId}`, {
				name,
				avatar,
				whatsapp,
				bio
			}).then(() => {
				alert('Dados da plataforma atualizados com sucesso!')
				history.push('/profile')
			}).catch(err => {
				alert('Erro ao atualizar dados')
				console.log(err)
			})
		}
	}

	async function handleUpdateAccount(e: FormEvent) {
		e.preventDefault()

		const isAuth = isAuthenticated()
		const token = JSON.stringify(getToken())

		if (isAuth) {
			const accountId = jwtDecode(token)
			await api.post(`accounts/${accountId}`, {
				firstName,
				lastName,
				email
			}).then(() => {
				alert('Dados de conta atualizados com sucesso!')
				history.push('/profile')
			}).catch(err => {
				alert('Erro ao atualizar dados')
				console.log(err)
			})
		}
	}

	return (
		<div id="page-teacher-form" className="container">
			<div className="avatar-modal" style={{ display: toggleModal}}>
				<div>
					<Input
						name="avatar"
						label=""
						placeholder="Url do seu avatar"
						value={avatar}
						onChange={e => {
							setAvatar(e.target.value)
						}} 
					/>
					<div className="avatar-modal-buttons">
						<FontAwesomeIcon
							icon={faCheck}
							className="v-button"
							onClick={ () => {
								setToggleModal('none')
								setShowPage('') 
								}
							}
						/>
						<FontAwesomeIcon
							icon={faTimes}
							className="x-button"
							onClick={ () => {
								setToggleModal('none')
								setShowPage('') 
								setAvatar('')
								}
							}
						/>
					</div>
				</div>
			</div>
			<header 
				className="teacher-profile-header" 
				style={{ backgroundImage: "url(" + successBackground + ")" }}
			>
				<div className="top-bar-container-profile">
					<Link to="/">
						<img src={backIcon} alt="Voltar" />
					</Link>
					<p>Meu perfil</p>
					<img src={logoImg} alt="Proffy" />
				</div>
				<div className="teacher-photo">
					<img src={avatar} />
					<FontAwesomeIcon
						icon={faCamera}
						className="photo-button"
					onClick={ () => {
						setToggleModal('')
						setShowPage('none') 
						}
					}
					/>
				</div>
				<p>{name}</p>
				<legend>Matemática - Biologia - Química</legend>
			</header>
			<main style={{display: showPage}}>
				<form onSubmit={handleUpdateUser}>
					<fieldset>
						<legend>Dados na plataforma</legend>
						<div className="user-data-inputs">
							<Input
								name="name"
								label="Apelido"
								value={name}
								onChange={e => {
									setName(e.target.value)
								}} 
								required
							/>
							<Input
								name="whatsapp"
								label="Whatsapp"
								value={whatsapp}
								onChange={e => {
									setWhatsapp(e.target.value)
								}} 
								required
							/>
						</div>
						<Textarea
							name="bio"
							label="Biografia"
							value={bio}
							onChange={e => {
								setBio(e.target.value)
							}} 
							required
						/>
					</fieldset>
					<footer>
						<p>
							<img src={warningIcon} alt="Aviso importante" />
							Importante! <br />
							Preencha todos os dados
						</p>
						<button type="submit">
							Salvar alterações
						</button>
					</footer>
				</form>
				<form onSubmit={handleUpdateAccount} style={{marginTop: '2rem'}}>
					<fieldset>
						<legend>Dados da sua conta</legend>
						<Input
							name="firstName"
							label="Seu nome"
							value={firstName}
							onChange={e => {
								setFirstName(e.target.value)
							}} 
							required
						/>
						<Input
							name="lastName"
							label="Seu sobrenome"
							value={lastName}
							onChange={e => {
								setLastName(e.target.value)
							}} 
							required
						/>
						<Input
							name="email"
							label="Seu email"
							value={email}
							onChange={e => {
								setEmail(e.target.value)
							}} 
							required
						/>
						<Link to="/change-password" id="change-password-button">
							<button type="submit" >
								Alterar minha senha
							</button>
						</Link>
						
					</fieldset>
					<footer>
						<p>
							<img src={warningIcon} alt="Aviso importante" />
							Importante! <br />
							Preencha todos os dados
						</p>
							<button type="submit">
								Salvar alterações
							</button>
					</footer>
				</form>
			</main>
		</div>
	)
}

export default Profile