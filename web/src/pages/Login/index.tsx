import React, { useState, FormEvent } from 'react'

import { useHistory } from 'react-router-dom'

import Input from '../../components/Input'

import api from '../../services/api'
import { login } from '../../services/auth'

import './styles.css'

function Login() { 

	const history = useHistory()

	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')

	function handleShootLogin(e: FormEvent) {
		e.preventDefault()
		api.post('login', {

			email,
			password
			
		}).then( (res) => {

			const token = res.data.token
			login(token)
			history.push('/study')

		}).catch( err => {
			console.log(err)
		})
	}

	return (
		<div id="page-login">
			<div id="page-login-content" className="container">
				<header className="form-title">
					<strong>Fazer login</strong>
				</header>
				<main>
					<form onSubmit={handleShootLogin}>
						<fieldset>
							<Input 
								name="email" 
								label="" 
								placeholder="E-mail"
								value={email}
								onChange={ e => {
									setEmail(e.target.value)
								}} 
							/>
							<Input 
								name="email" 
								label="" 
								placeholder="Senha"
								value={password}
								onChange={ e => {
									setPassword(e.target.value)
								}} 
							/>
						</fieldset>
						<div className="login-options">
							<div className="remember-me"></div>
							<div className="forgot-password"></div>
						</div>
						<button type="submit">
							Entrar
						</button>
					</form>
				</main>
			</div>
		</div>
	)
}

export default Login