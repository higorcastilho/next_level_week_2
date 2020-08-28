import db from '../database/connection'
const { hash } = require('../utils/hash')

const index = async (id: number) => {
	try {
		return await db('users')
			.where({ account_id: id })
			.innerJoin('accounts', 'users.account_id', '=', 'accounts.id')

	} catch (e) {
		console.log(e)
	}
}

const update = async ( id: number, name: string, avatar: string, whatsapp: string, bio: string ) => {
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

const updateAccountData = async ( id: number, firstName: string, lastName: string, email: string ) => {
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

const create = async ( firstName: string, lastName: string, email: string, password: string ) => {
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