import express from 'express'
import ConnectionsController from '../controllers/ConnectionsController'
const connectionsController = new ConnectionsController()

import verifyJwt from '../utils/verifyJwt'

const routes = express.Router()

routes.get('/connections', verifyJwt, connectionsController.index)
routes.post('/connections', connectionsController.create)

export default routes