import db from '../database/connection'
import hash from '../utils/hash'

export default class AccountsController {

	async index(req, res) {
		try {
			const userInfo = await db('users').where({
				account_id: req.params.id
			})
			res.json(userInfo)

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
					bio: req.body.bio,
				})

			res.json(userUpdated)

		} catch (e) {
			console.log(e)
		}
	}

	async create(req, res) {
		try {
			const { name, lastName, email, password } = req.body

			const hashedPassword = await hash.encrypt(password)

			const account_info = await db('accounts').insert({
				name, 
				lastName,
				email,
				password: hashedPassword
			})

			await db('users').insert({
				name: '',
				avatar: '',
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