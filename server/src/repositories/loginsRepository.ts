import JWT from 'jsonwebtoken'
import db from '../database/connection'
import hash from '../utils/hash'
import crypto from 'crypto'

const { sendMail, verifyTransporter } =   require('../utils/forgotPasswordHandler/index.nodemailer')

interface DataProps {
	email: string
	password: string
	token: string
	accountId: number
}

const verifyIfEmailExists = async <DataProps>(email) => {

	const account = await db('accounts').where('email', email)
	if (!account) false
	if (account) { return account }

}

const login = async <DataProps>(email) => await db('accounts').where('email', email)
	

const forgotPassword = async <DataProps>(accountId, token, now) => {
		await db('accounts')
			.where('id', accountId)
			.update({ password_reset_token: token, password_reset_expires: now })
}

const resetPassword = async <DataProps>(email, password) => {
		await db('accounts')
			.where('email', email)
			.update({ password })
}

module.exports = {
	login,
	forgotPassword, 
	resetPassword,
	verifyIfEmailExists
}

