const nodemailer = require('nodemailer')

const { 

} = process.env

const transporter = nodemailer.createTransport({
	host: ,
	port: ,
	secure: false,
	auth: {
		user: ,
		pass:
	},
	tls: {
		rejectUnauthorized: false
	}
})

transporter.verify( (error, success) => {
	if(error) {
		console.log(error)
	} else {
		console.log('Server is ready to take our messages')
	}
})



