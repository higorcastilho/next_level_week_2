import { FormEvent } from 'react'

import api from '../services/api'
import jwtDecode from '../services/jwtDecode'
import { isAuthenticated, getToken, logout } from '../services/auth'

interface Response {
	userId: number
	name: string
	avatar: string
	whatsapp: string
	bio: string
	account_id: number
	firstName: string
	lastName: string
	email: string
}

export default function handleUser():Promise<Response> {

	return new Promise( resolve => {

		const isAuth = isAuthenticated()
		if (isAuth) {

			const token = JSON.stringify(getToken() ? getToken() : '')
			const accountId = jwtDecode(token)

			api.get(`accounts/${accountId}`).then( res => {

				const userId = res.data.data[0].id
				const name = res.data.data[0].attributes.name  
				const avatar = res.data.data[0].attributes.avatar  
				const whatsapp = res.data.data[0].attributes.whatsapp  
				const bio = res.data.data[0].attributes.bio  
				const account_id = res.data.data[0].attributes.account_id  
				const firstName = res.data.data[0].attributes.firstName  
				const lastName = res.data.data[0].attributes.lastName  
				const email = res.data.data[0].attributes.email  

				resolve({
					userId: userId ? userId : 0,
					name: name ? name : '',
					avatar: avatar ? avatar : '',
					whatsapp: whatsapp ? whatsapp : '',
					bio: bio ? bio : '',
					account_id: account_id ? account_id : '',
					firstName: firstName ? firstName : '',
					lastName: lastName ? lastName : '',
					email: email ? email : ''
				})
			}).catch( err => {
				console.log(err)
			})
		} else {
			console.log('Invalid token')
		}
	})
}