import React, { createContext, useState, FormEvent } from 'react'

import handleLogin from './login.auth.context'
import handleUser from './user.auth.context'


interface AuthContextData {
	authenticated: boolean
	user: {
		name: string
		avatar: string
	}
	signIn(email:string, password:string):Promise<void>
	handleUserInfo():Promise<void>
}

export const Context = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ( { children } ) => {

	const [ user, setUser ] = useState({
		name: '',
		avatar: ''
	})

	const [ authenticated, setAuthenticated ] = useState(false)

	async function signIn(email:string, password:string) {

		await handleLogin(email, password)
		setAuthenticated(true)
	}

	async function handleUserInfo() {
		const { name, avatar } = await handleUser()
		setUser({name, avatar})
	}

	return (
		<Context.Provider value={ { authenticated, user, signIn, handleUserInfo } }>
			{ children }
		</Context.Provider>
	)
}
