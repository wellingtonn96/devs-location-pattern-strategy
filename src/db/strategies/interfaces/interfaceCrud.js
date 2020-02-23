class NoImplementedException extends Error {
    constructor() {
        super("Not Emplemented Exception")
    }
}

class ICrud {
    create(item) {
        throw new NoImplementedException()
    }

    read(query) {
        throw new NoImplementedException()
    }

    update(id, item) {
        throw new NoImplementedException()
    }

    delete(id) {
        throw new NoImplementedException()
    }

    connect() {
        throw new NoImplementedException()
    }
}

module.exports = ICrud