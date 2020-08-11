import express from 'express'
import LoginsController from '../controllers/LoginsController'
const loginsController = new LoginsController()

const routes = express.Router()

routes.post('/login', loginsController.login)

export default routes