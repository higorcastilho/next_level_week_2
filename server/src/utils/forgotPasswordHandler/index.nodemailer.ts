const nodemailer = require('nodemailer')

const { 

	EMAIL_TRASPORTER, 
	EMAIL_PASS,
	CLIENT_ID,
	CLIENT_SECRET_KEY,
	REFRESH_TOKEN,
	ACCESS_TOKEN

} = process.env

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
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

const message = {
	from: 'castilhohf@gmail.com',
	to: 'castilhohf@gmail.com',
	subject: 'Message title',
	html: '<p>HTML version of the message</p>'
}

transporter.sendMail(message, (error, info) => {
	if (error){
		console.log(error)
	} else {
		console.log(info)
	}
})


