const ICrud = require('../interfaces/interfaceCrud')
const Sequelize = require('sequelize');

class Postegres extends ICrud {
    constructor(model) {
        super()
        this._model = model
    }

    static connect() {
        const connection = new Sequelize('dev_location', 'postgres', 1234, {
            host: 'localhost',
            dialect: 'postgres',
            logging: false
        })
        return connection
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.tableName,
            schema.schema,
            schema.options
        )
        await model.sync()
        return model
    }

    async create(item) {
      return this._model.create(item)
    }

    async read(item = {}) {
        return this._model.findAll({ where: item, raw: true })
    }

    async update(id, item) {
        return this._model.update(item, { where: { id: id}})
    }

    async delete(id) {
        const query = id ? {id} : {}
        return this._model.destroy({ where: query })
    }   
}

module.exports = Postegres;