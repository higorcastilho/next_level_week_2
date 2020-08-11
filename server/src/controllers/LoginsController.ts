import JWT from 'jsonwebtoken'
import db from '../database/connection'
import hash from '../utils/hash'

export default class LoginsController {
	async login(req, res) {
		const { email, password } = req.body

		const userData = await db('accounts').where({
			email
		})

		const passwordOk = await hash.compare(password, userData[0].password)
		
		if(!passwordOk) {
			//throw new Error('Senha inválida');
			console.log('Senha inválida')
			res.json({'error': 'Senha inválida'})
		}
		const generate = await new Promise(resolve => {
			JWT.sign({
				exp: Math.floor(Date.now() / 1000) + 6000,
				sub: userData[0].id,
				iss: 'sqlite-3',
				data: {
					user_id: userData[0].ids
				}, 
			}, 'asasdasdsadf', {algorithm: 'HS256'}, (err, token) => {
				if (err) {
					console.log(err)
				}
				resolve(token)
			})
		})

		res.json({ email, generate })
	}
}