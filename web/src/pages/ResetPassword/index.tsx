import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { useHistory } from 'react-router-dom'

import Input from '../../components/Input'
import CommonCase from '../../components/CommonCase'

import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/images/logo.svg'

function ResetPassword() { 

	const history = useHistory()

	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ token, setToken ] = useState('')
	
	const [ buttonCollor, setButtonColor ] = useState('#dcdce5')
	const [ letterCollor, setLetterColor ] = useState('#9c98a6')

	function handleButtonColor() {
		if(email != '' && password != '') {
			setButtonColor('#04d361')
			setLetterColor('#ffffff')
		} else if ( email === '' || password === '' ) {
			setButtonColor('#dcdce5')
			setLetterColor('#9c98a6')
		}
	}

	async function handleShootResetPassword(e: FormEvent) {
		e.preventDefault()

		await api.post('reset-password', {

			email,
			password,
			token	
		}).then( () => {
			history.push('/login')
			alert('Redefinição realizada com sucesso!')

		})

	}

	return (
		<div id="page-login">
			<div id="page-login-content" >
				<header className="form-title">
					<strong><p>Reset de senha</p></strong>
					<p>Por favor, digite sua nova senha.</p>
				</header>
				<main>
					<form onSubmit={handleShootResetPassword}>
						<fieldset>
							<Input 
								name="token" 
								label="" 
								placeholder="Código"
								required
								value={token}
								onChange={ e => {
									setToken(e.target.value)
								}}
								onKeyUp={handleButtonColor} 
							/>
							<Input 
								name="email" 
								label="" 
								placeholder="E-mail"
								required
								value={email}
								onChange={ e => {
									setEmail(e.target.value)
								}}
								onKeyUp={handleButtonColor} 
							/>
							<Input 
								name="senha" 
								label=""
								type="password" 
								placeholder="Senha"
								required
								value={password}
								onChange={ e => {
									setPassword(e.target.value)
								}}
								onKeyUp={handleButtonColor} 
							/>

						</fieldset>
						<button type="submit" style={{backgroundColor: '#04d361', color: '#ffffff'}}>
							Concluir reset de senha
						</button>
					</form>
				</main>
			</div>
			<CommonCase mainImg={logoImg} subtitle="Sua plataforma de estudos online"/>
		</div>
	)
}

export default ResetPassword
