import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
dotenv.config()

const { PORT } = process.env

const routes = require('./routes/index')
const app = express()

app.use(cors())
app.use(express.json())

app.use(routes.connectionsRoutes)
app.use(routes.classesRoutes)

app.listen(PORT, () => {
	console.log('Running on port 3333')
})