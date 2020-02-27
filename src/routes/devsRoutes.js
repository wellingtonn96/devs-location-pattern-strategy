const express = require('express');
const route = express.Router()
const devController = require('../controllers/devController')

const devsValidation = require('../middlewares/validationDevs')
const authMiddleware = require('../middlewares/authMiddleware')

route.use(authMiddleware.authMiddleware)

route.post('/', devsValidation, devController.createDevs)

route.get('/', devController.readDevs)

route.put('/:id', devsValidation, devController.updateDevs)

route.delete('/:id', devController.deleteDevs)

module.exports = route