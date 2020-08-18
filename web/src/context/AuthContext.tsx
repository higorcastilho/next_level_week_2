import React, { createContext, useState, FormEvent } from 'react'

import handleLogin from './login.auth.context'
import handleUser from './user.auth.context'


interface AuthContextData {
	authenticated: boolean
	user: {
		accId: number
		name: string
		avatar: string
	}
	signIn(email:string, password:string):Promise<void>
	handleUserInfo():Promise<void>
}

export const Context = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ( { children } ) => {

	const [ user, setUser ] = useState({
		accId: 0,
		name: '',
		avatar: ''
	})

	const [ authenticated, setAuthenticated ] = useState(false)

	async function signIn(email:string, password:string) {

		await handleLogin(email, password)
		
		setAuthenticated(true)
	}

	async function handleUserInfo() {
		const { accId, name, avatar } = await handleUser()
		setUser({accId, name, avatar})
	}

	return (
		<Context.Provider value={ { authenticated, user, signIn, handleUserInfo } }>
			{ children }
		</Context.Provider>
	)
}
