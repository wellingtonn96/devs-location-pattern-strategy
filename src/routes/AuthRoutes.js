const express = require('express');

const authController = require('../app/controllers/AuthController')

class AuthRoutes {
    constructor() {
        this.route = express.Router()

        this.login();
    }

    login() {
        return this.route.post('/login', authController.login)
    }

}

module.exports = new AuthRoutes().route