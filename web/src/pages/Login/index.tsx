import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { useHistory } from 'react-router-dom'

import Input from '../../components/Input'

import api from '../../services/api'
import { login } from '../../services/auth'

import './styles.css'
import logoImg from '../../assets/images/logo.svg'
import successBackground from '../../assets/images/success-background.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import successCheck from '../../assets/images/icons/success-check-icon.svg'

function Login() { 

	const history = useHistory()

	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ isChecked, setIsChecked ] = useState(false)
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

	function handleIsChecked() {
		if (isChecked) setIsChecked(false)
		else setIsChecked(true)
	}

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
			<div id="logo-container" style={{backgroundImage: "url(" + successBackground +")"}}>
				<img src={logoImg} alt="Proffy" />
				<h2>Sua plataforma de estudos online</h2>
			</div>
			<div id="page-login-content" >
				<header className="form-title">
					<strong><p>Fazer login</p></strong>
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
								onKeyUp={handleButtonColor} 
							/>
							<Input 
								name="email" 
								label=""
								type="password" 
								placeholder="Senha"
								value={password}
								onChange={ e => {
									setPassword(e.target.value)
								}}
								onKeyUp={handleButtonColor} 
							/>
						</fieldset>
						<div className="login-options">
							<span className="remember-me" onClick={handleIsChecked}>
								{ isChecked 
									? <img src={successCheck} />
									: <input type="checkbox" id="remember" name="remember"/>
								}
								<label htmlFor="remember" > Lembrar-me </label>
							</span>
							<span className="forgot-password">
								Esqueci minha senha
							</span>
						</div>
						<button type="submit" style={{backgroundColor: buttonCollor, color: letterCollor}}>
							Entrar
						</button>
						<footer>
							<div className="register-footer">
								<div>
									<p>Não tem conta?</p>
									<Link to="">Cadastre-se</Link>
								</div>
								<p>É de graça <img src={purpleHeartIcon} alt="Coração roxo" /></p>
							</div>
						</footer>
					</form>
				</main>
			</div>
		</div>
	)
}

export default Login