import db from '../database/connection'
const { hash } = require('../utils/hash')

interface DataProps {
	id: number
	name: string
	avatar: string
	whatsapp: string
	bio: string
	firstName: string
	lastName: string
	email: string
	password: string
}


const index = async <DataProps>(id) => {
	try {
		return await db('users')
			.where({ account_id: id })
			.innerJoin('accounts', 'users.account_id', '=', 'accounts.id')

	} catch (e) {
		console.log(e)
	}
}

const update = async <DataProps>( id, name, avatar, whatsapp, bio ) => {
	try {
		return await db('users')
			.where({ account_id: id })
			.update({ 
				name,
				avatar,
				whatsapp,
				bio
			})
	} catch (e) {

		console.log(e)
	}
}

const updateAccountData = async <DataProps>( id, firstName, lastName, email ) => {
	try {
		return await db('accounts')
			.where({ id })
			.update({ 
				firstName,
				lastName,
				email
			})

	} catch (e) {
		console.log(e)
	}
}

const create = async <DataProps>( firstName, lastName, email, password ) => {
	try {

		const account_info = await db('accounts').insert({
			firstName, 
			lastName,
			email,
			password
		})

		await db('users').insert({
			name: 'Nome',
			avatar: 'Avatar',
			whatsapp: '',
			bio: '',
			account_id: account_info[0]
		})

		return 'Account successfuly created'

	} catch (e) {
		console.log(e)
	}

}

module.exports = {
	index,
	update, 
	updateAccountData,
	create
}