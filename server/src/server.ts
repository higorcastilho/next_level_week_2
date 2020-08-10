import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
const routes = require('./routes/index')

dotenv.config()
const app = express()

const { PORT } = process.env

app.use(cors())
app.use(express.json())


app.use(routes.connectionsRoutes)
app.use(routes.classesRoutes)

app.listen(PORT, () => {
	console.log('Running on port 3333')
})