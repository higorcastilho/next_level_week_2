import React, { useState, FormEvent, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'

import api from '../../services/api'
import jwtDecode from '../../services/jwtDecode'
import { isAuthenticated, getToken } from '../../services/auth'

import './styles.css'

function Profile() {

	useEffect( () => {
		const isAuth = isAuthenticated()
		const token = JSON.stringify(getToken())

		if (isAuth) {
			const accountId = jwtDecode(token)
			api.get(`accounts/${accountId}`).then( res => {

				setName(res.data[0].name)
				setAvatar(res.data[0].avatar)
				setWhatsapp(res.data[0].whatsapp)
				setBio(res.data[0].bio)
			})
		}
	}, [])


	const history = useHistory()

	const [ name, setName ] = useState('')
	const [ avatar, setAvatar ] = useState('')
	const [ whatsapp, setWhatsapp ] = useState('')
	const [ bio, setBio ] = useState('')

	function handleUpdateUser(e: FormEvent) {
		e.preventDefault()

		const isAuth = isAuthenticated()
		const token = JSON.stringify(getToken())

		if (isAuth) {
			const accountId = jwtDecode(token)
			api.post(`accounts/${accountId}`, {
				name,
				avatar,
				whatsapp,
				bio
			}).then( () => {
				alert('Dados atualizados com sucesso!')
				history.push('/profile')
			}).catch( err => {
				alert('Erro ao atualizar dados')
				console.log(err)
			})
		}
	}

	return (
		<div id="page-teacher-form" className="container">
			<PageHeader 
				title="Que incrível que você quer dar aulas."
				description="O primeiro passo é preencher este formulário de inscrição"
			/>
			<main>
				<form onSubmit={handleUpdateUser}>
					<fieldset>
						<legend>Seus dados</legend>
							<Input 
								name="name" 
								label="Nome completo" 
								value={name} 
								onChange={ e => {
									setName(e.target.value)
								}}/>
							<Input 
								name="avatar" 
								label="Avatar"
								value={avatar} 
								onChange={ e => {
									setAvatar(e.target.value)
							}}/>
							<Input 
								name="whatsapp" 
								label="Whatsapp" 
								value={whatsapp} 
								onChange={ e => {
									setWhatsapp(e.target.value)
							}}/>
							<Textarea 
								name="bio" 
								label="Biografia"
								value={bio} 
								onChange={ e => {
									setBio(e.target.value) 
							}}/>
					</fieldset>

					<footer>
						<p>
							<img src={warningIcon} alt="Aviso importante" />
							Importante! <br />
							Preencha todos os dados
						</p>
						<button type="submit">
							Salvar cadastro
						</button>
					</footer>
				</form>
			</main>
		</div>
	)
}

export default Profile