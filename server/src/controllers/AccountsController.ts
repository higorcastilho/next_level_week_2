import db from '../database/connection'
import hash from '../utils/hash'

export default class AccountsController {

	async index(req, res) {
		try {
			const userInfo = await db('users').where({
				account_id: req.params.id
			}).innerJoin('accounts', 'users.account_id', '=', 'accounts.id')

			const {
				id, 
				name, 
				avatar, 
				whatsapp, 
				bio, 
				account_id, 
				firstName, 
				lastName, 
				email } = userInfo[0]

			res.json({
				"data": [{
					"type": "users",
					"id": id,
					"attributes": {
						"name": name,
						"avatar": avatar,
						"whatsapp": whatsapp,
						"bio": bio,
						"account_id": account_id,
						"firstName": firstName,
						"lastName": lastName,
						"email": email
					}
				}]
			})

		} catch (e) {
			console.log(e)
		}
	}

	async update(req, res) {
		try {
			const userUpdated = await db('users')
				.where({ account_id: req.params.id })
				.update({ 
					name: req.body.name,
					avatar: req.body.avatar,
					whatsapp: req.body.whatsapp,
					bio: req.body.bio
				})

			res.json(userUpdated)

		} catch (e) {
			console.log(e)
		}
	}

	async updateAccountData(req, res) {
		try {
			const userUpdated = await db('accounts')
				.where({ id: req.params.id })
				.update({ 
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
				})

			res.json(userUpdated)

		} catch (e) {
			console.log(e)
		}
	}

	async create(req, res) {
		try {
			const { firstName, lastName, email, password } = req.body

			const hashedPassword = await hash.encrypt(password)

			const account_info = await db('accounts').insert({
				firstName, 
				lastName,
				email,
				password: hashedPassword
			})

			await db('users').insert({
				name: 'Nome',
				avatar: 'Avatar',
				whatsapp: '',
				bio: '',
				account_id: account_info[0]
			})

			return res.status(201).send('Account successfuly created')

		} catch (e) {
			console.log(e)
		}

	}
}