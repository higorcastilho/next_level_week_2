import { FormEvent } from 'react'

import api from '../services/api'
import jwtDecode from '../services/jwtDecode'
import { isAuthenticated, getToken, logout } from '../services/auth'

interface Response {
	name: string
	avatar: string
}

export default function handleUser():Promise<Response> {

	return new Promise( resolve => {

		const isAuth = isAuthenticated()
		if (isAuth) {

			const token = JSON.stringify(getToken() ? getToken() : '')
			const accountId = jwtDecode(token)

			api.get(`accounts/${accountId}`).then( res => {
				const name = res.data[0].name  
				const avatar = res.data[0].avatar

				resolve({
					name: name ? name : '',
					avatar: avatar ? avatar : ''
				})
			}).catch( err => {
				console.log(err)
			})
		} else {
			console.log('Invalid token')
		}
	})
}