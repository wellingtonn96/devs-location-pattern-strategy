const ICrud = require('../interfaces/interfaceCrud')
const Mongoose = require('mongoose');

const STATUS_CONNECTION = { 
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized',
}
 
class MongoDB extends ICrud {
    constructor(connection, model) {
        super()
        this._connection = connection
        this._model = model
    }

    static connect() {
        Mongoose.connect('mongodb://localhost:27017/devs_location', { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const connection = Mongoose.connection
        connection.once('open', () => console.log('database rondando'))
        return connection
    }

    isConnect() {
        return STATUS_CONNECTION[this._connection._readyState]
    }

    create(item) {
        return this._model.create(item)
    }

    read(item, skip=0, limit=10) {
        return this._model.find(item).skip(skip).limit(limit)
    }

    update(id, item) {
        return this._model.updateOne({ _id: id }, { $set: item })
    }

    delete(id) {
        return this._model.deleteOne({ _id: id })
    }
}   

module.exports = MongoDB;
