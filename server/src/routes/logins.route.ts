import express from 'express'
import LoginsController from '../controllers/LoginsController'
const loginsController = new LoginsController()

const routes = express.Router()

routes.post('/login', loginsController.login)
routes.post('/forgot-password', loginsController.forgotPassword)
routes.post('/reset-password', loginsController.resetPassword)

export default routes