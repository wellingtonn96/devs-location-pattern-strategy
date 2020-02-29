const express = require('express')

class Server {
    constructor() {
        this.PORT = 3000;

        this.server = express();

        this.middlewares();
        this.routes();

        this.upServer();
    }

    upServer() {
        return this.server.listen(this.PORT, () => {
            console.log('Server running on port 3000');
        })
    }

    middlewares() {
        return this.server.use(express.json());
    }

    routes() {
        this.server.use('/', require('./routes/AuthRoutes'))
        this.server.use('/register', require('./routes/UsersRoutes'))
        this.server.use('/devs', require('./routes/DevsRoutes'))
    }

}

module.exports = new Server().server;