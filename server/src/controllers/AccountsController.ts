import db from '../database/connection'
import hash from '../utils/hash'

export default class AccountsController {
	async create(req, res) {
		try {
			const { email, password } = req.body

			const hashedPassword = await hash.encrypt(password)

			await db('accounts').insert({
				email,
				password: hashedPassword
			})

			return res.status(201).send('Account successfuly created')

		} catch (e) {
			console.log(e)
		}

	}
}