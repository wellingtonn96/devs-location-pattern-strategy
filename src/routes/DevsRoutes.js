const express = require('express');
const devController = require('../app/controllers/DevController')
const authMiddleware = require('../app/middlewares/authMiddleware')

class DevRoutes {
    constructor() {
        this.route = express.Router()
        
        this.authMiddleware()
        this.createDevs()
        this.readDevs()
        this.updateDevs()
        this.deleteDevs()
    }

    authMiddleware(){
        return this.route.use(authMiddleware.authMiddleware)
    }

    createDevs() {
        return this.route.post('/', devController.createDevs)
    }

    readDevs() {
        return this.route.get('/', devController.readDevs)
    }

    updateDevs() {
        return this.route.put('/:id', devController.updateDevs)
    }

    deleteDevs() {
        return this.route.delete('/:id', devController.deleteDevs)
    }
}


module.exports = new DevRoutes().route