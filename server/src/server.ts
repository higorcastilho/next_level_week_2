import dotenv from 'dotenv'
import express from 'express'
import routes from './routes/routes'
import cors from 'cors'

dotenv.config()

const { PORT } = process.env
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
	console.log('Running on port 3333')
})