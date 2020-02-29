const express = require('express');

const userController = require('../app/controllers/UserController')

class UserRouter {
    constructor() {
        this.route = express.Router()

        this.createUser()
    }

    createUser() {
        return this.route.post('/', userController.createUser)
    }
}

module.exports = new UserRouter().route