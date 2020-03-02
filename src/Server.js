const express = require('express')
const Boom = require('boom')

require('dotenv/config')

class Server {
    constructor() {
        this.PORT = process.env.PORT;

        this.server = express();

        this.middlewares();
        this.routes();

        this.upServer();
    }

    upServer() {
        return this.server.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}`);
        })
    }

    middlewares() {
        return this.server.use(express.json());
    }

    routes() {
        this.server.use('/', require('./routes/AuthRoutes'))
        this.server.use('/register', require('./routes/UsersRoutes'))
        this.server.use('/devs', require('./routes/DevsRoutes'))
        this.server.use((req, res) => {
            return res.status(404).json(Boom.notFound())
        })
    }

}

module.exports = new Server().server;