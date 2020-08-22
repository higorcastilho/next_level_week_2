import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'

import Input from '../../components/Input'
import CommonCase from '../../components/CommonCase'

import './styles.css'
import logoImg from '../../assets/images/logo.svg'

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import successCheck from '../../assets/images/icons/success-check-icon.svg'

function Login() { 


	const { authenticated, signIn } = useContext(Context)
	

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

	async function handleLogin(e: FormEvent) {
		e.preventDefault()

		await signIn(email, password)
		if (authenticated) {
			history.push('/')
		} else {
			console.log('Senha ou e-mail invalido.')
			history.push('/login')
		}
	}

	return (
		<div id="page-login">
			
			<CommonCase mainImg={logoImg} subtitle="Sua plataforma de estudos online"/>
			<div id="page-login-content" >
				<header className="form-title">
					<strong><p>Fazer login</p></strong>
				</header>
				<main>
					<form onSubmit={ handleLogin }>
						<fieldset>
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
								name="email" 
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
						<div className="login-options">
							<span className="remember-me" onClick={handleIsChecked}>
								{ isChecked 
									? <img src={successCheck} />
									: <input type="checkbox" id="remember" name="remember"/>
								}
								<label htmlFor="remember" > Lembrar-me </label>
							</span>
							<span className="forgot-password">
							<Link to="/forgot-password">
								Esqueci minha senha
							</Link>
							</span>
						</div>
						<button type="submit" style={{backgroundColor: buttonCollor, color: letterCollor}}>
							Entrar
						</button>
						<footer>
							<div className="register-footer">
								<div>
									<p>Não tem conta?</p>
									<Link to="/register">Cadastre-se</Link>
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