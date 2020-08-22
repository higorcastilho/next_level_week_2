import { FormEvent } from 'react'

import api from '../services/api'
import jwtDecode from '../services/jwtDecode'
import { login } from '../services/auth'

interface Response {
	signed: boolean
}

export default function handleLogin(email:string, password:string):Promise<Response> {
	return new Promise( resolve => {
		api.post('login', {
			email, 
			password
		}).then( res => {
			const token = res.data.token
			const userId = jwtDecode(token)

			if (token === undefined) {
				throw new Error('Invalid token');
			}

			login(token)

			resolve({ signed: true })
			
		}).catch( err => {
			console.log(err)
		})
	})
}