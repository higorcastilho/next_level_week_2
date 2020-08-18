import express from 'express'
import ClassesController from '../controllers/ClassesController'
const classesController = new ClassesController()

import verifyJwt from '../utils/verifyJwt'

const routes = express.Router()

routes.get('/classes', verifyJwt, classesController.index)
routes.post('/classes/:id', classesController.create)

export default routes