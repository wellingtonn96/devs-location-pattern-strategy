const express = require('express');
const route = express.Router()
const devController = require('../controllers/devController')

route.post('/', devController.createDevs)

route.get('/', devController.readDevs)

route.put('/:id', devController.updateDevs)

route.delete('/:id', devController.deleteDevs)

module.exports = route