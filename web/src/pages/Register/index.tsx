import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { useHistory } from 'react-router-dom'

import Input from '../../components/Input'
import CommonCase from '../../components/CommonCase'

import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/images/logo.svg'

function Register() { 

	const history = useHistory()

	const [ firstName, setFirstName ] = useState('')
	const [ lastName, setLastName ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	
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

	function handleShootRegister(e: FormEvent) {
		e.preventDefault()
		api.post('accounts', {

			firstName,
			lastName,
			email,
			password
			
		}).then( () => {

			history.push('/done-register')

		}).catch( err => {
			console.log(err)
		})
	}

	return (
		<div id="page-login">
			<div id="page-login-content" >
				<header className="form-title">
					<strong><p>Cadastro</p></strong>
					<p>Preencha os dados abaixo para começar.</p>
				</header>
				<main>
					<form onSubmit={handleShootRegister}>
						<fieldset>
							<Input 
								name="nome" 
								label=""
								type="text" 
								placeholder="Nome"
								required
								value={firstName}
								onChange={ e => {
									setFirstName(e.target.value)
								}}
								onKeyUp={handleButtonColor} 
							/>
							<Input 
								name="sobrenome" 
								label=""
								type="text" 
								placeholder="Sobrenome"
								required
								value={lastName}
								onChange={ e => {
									setLastName(e.target.value)
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
							Concluir cadastro
						</button>
					</form>
				</main>
			</div>
			<CommonCase mainImg={logoImg} subtitle="Sua plataforma de estudos online"/>
		</div>
	)
}

export default Register