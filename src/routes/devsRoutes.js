const express = require('express');
const route = express.Router()
const {
    createDevs,
    readDevs,
    updateDevs,
    deleteDevs
} = require('../controllers/devController')

route.post('/', createDevs)

route.get('/', readDevs)

route.put('/:id', updateDevs)

route.delete('/:id', deleteDevs)

module.exports = route