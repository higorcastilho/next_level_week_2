import { FormEvent } from 'react'

import api from '../services/api'
import jwtDecode from '../services/jwtDecode'
import { login } from '../services/auth'

export default async function handleLogin(email:string, password:string) {
	await api.post('login', {
		email, 
		password
	}).then( res => {
		const token = res.data.token
		const userId = jwtDecode(token)
		login(token)
		
	}).catch( err => {
		console.log(err)
	})
}