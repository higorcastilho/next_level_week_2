import JWT from 'jsonwebtoken'
import hash from '../utils/hash'
import crypto from 'crypto'

const { sendMail, verifyTransporter } =   require('../utils/forgotPasswordHandler/index.nodemailer')
const LoginsRepository = require('../repositories/loginsRepository')


export default class LoginsController {
	async login(req, res) {
		const { email, password } = req.body

		const userData = await LoginsRepository.login(email)

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

		res.json({ "type": "bearer", "token": generate })
	}

	async forgotPassword(req, res) {
		const { email } = req.body
		try {

			const account = await LoginsRepository.verifyIfEmailExists(email)

			if (!account) {
				return res.status(400).send({ error: 'User not found' })
			}

			const token = crypto.randomBytes(20).toString('hex')

			const now =  new Date()
			now.setHours(now.getHours() + 1)

			await LoginsRepository.forgotPassword(account[0].id, token, now)

			sendMail(email, token)

			res.send()

		} catch (err) {
			res.status(400).send({ error: 'Error on forgot password. Please, try again.' })
		}

	}

	async resetPassword(req, res) {
		const { email, password, token } = req.body

		try {

			const account = await LoginsRepository.verifyIfEmailExists(email)
			if (!account) {
				return res.status(400).send({ error: 'User not found' })
			} 

			if (account[0].password_reset_token !== token) {
				return res.status(400).send({ error: 'Invalid token.' })
			}

			const now = new Date()

			if (now > account[0].password_reset_expires) {
				return res.status(400).send({ error: 'Token expired.' })
			}

			const hashedPassword = await hash.encrypt(password)

			await LoginsRepository.resetPassword(email, hashedPassword)
			res.send()

		} catch (err) {
			res.status(400).send({ error: 'Invalid link. Please, try get a new email link.' })
		}
	}
}