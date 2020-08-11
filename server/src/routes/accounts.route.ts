import express from 'express'
import AccountsController from '../controllers/AccountsController'
const accountsController = new AccountsController()

const routes = express.Router()

routes.post('/accounts', accountsController.create)

export default routes

