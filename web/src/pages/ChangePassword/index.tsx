import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'


import Input from '../../components/Input'
import CommonCase from '../../components/CommonCase'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons"

import './styles.css'
import logoImg from '../../assets/images/logo.svg'

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import successCheck from '../../assets/images/icons/success-check-icon.svg'

function ChangePassword() { 
	
	const history = useHistory()

	const { user } = useContext(Context)

	const [ email, setEmail ] = useState('')
	const [ currentPassword, setCurrentPassword ] = useState('')
	const [ newPassword, setNewPassword ] = useState('')
	const [ newPasswordCompare, setNewPasswordCompare ] = useState('')

	const [ isChecked, setIsChecked ] = useState(false)
	const [ buttonCollor, setButtonColor ] = useState('#dcdce5')
	const [ letterCollor, setLetterColor ] = useState('#9c98a6')

	function handleButtonColor() {
		if(currentPassword != '' && newPassword != '' && newPasswordCompare != '') {
			setButtonColor('#04d361')
			setLetterColor('#ffffff')
		} else if ( currentPassword === '' || newPassword === '' || newPasswordCompare === '') {
			setButtonColor('#dcdce5')
			setLetterColor('#9c98a6')
		}
	}

	function handleIsChecked() {
		if (isChecked) setIsChecked(false)
		else setIsChecked(true)
	}

	async function handleChangePassword(e: FormEvent) {
		e.preventDefault()

		setEmail(user.email)

		if (newPassword != newPasswordCompare) {
			alert('As senhas não batem. Por favor, digite novamente.')
			return
		}
		
		try {

			await api.post('change-password', {
				email,
				currentPassword,
				newPassword
			}).then( () => {
				alert('Senha alterada com sucesso.')
			})

		} catch (e) {
			console.log(e.message)
		} finally {

			history.push('/profile')
		}

	}

	return (
		<div id="page-forgot-pass">
			<div id="page-forgot-pass-content" >
				<div id="top-bar-container-forgot-pass">
					<Link to="/profile">
						<FontAwesomeIcon 
							icon={faLongArrowAltLeft} 
							className="back-arrow-forgot-pass"
						/>
					</Link>
				</div>
				<header className="form-title">
					<strong><p>Alterar senha</p></strong>
					<p>Por favor, digite sua senha atual e sua nova senha.</p>
				</header>
				<main>
					<form onSubmit={ handleChangePassword }>
						<fieldset>
							<Input 
								name="currentPassword" 
								label="Senha atual" 
								placeholder="Senha atual"
								required
								type="password"
								value={currentPassword}
								onChange={ e => {
									setCurrentPassword(e.target.value)
								}}
								onKeyUp={handleButtonColor} 
							/>
							<Input 
								name="newPassword" 
								label="Nova senha" 
								placeholder="Nova senha"
								required
								type="password"
								value={newPassword}
								onChange={ e => {
									setNewPassword(e.target.value)
								}}
								onKeyUp={handleButtonColor} 
							/>
							<Input 
								name="newPasswordCompare" 
								label="Confirme sua nova senha" 
								placeholder="Nova senha"
								required
								type="password"
								value={newPasswordCompare}
								onChange={ e => {
									setNewPasswordCompare(e.target.value)
								}}
								onKeyUp={handleButtonColor} 
							/>
						</fieldset>
						<button type="submit" style={{backgroundColor: buttonCollor, color: letterCollor}}>
							Alterar senha
						</button>
					</form>
				</main>
			</div>
			<CommonCase mainImg={logoImg} subtitle="Sua plataforma de estudos online"/>
		</div>
	)
}

export default ChangePassword