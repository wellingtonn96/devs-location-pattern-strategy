const axios = require('axios')

const Context = require('../database/strategies/base/contextStrategy')
const Postgres = require('../database/strategies/postgres/postegres')
const schemaDevs = require('../database/strategies/postgres/schemas/devSchema')

//post
exports.createDevs = async (req, res) => {
    const { github_username, techs, latitude, longitude } = req.body

    const apiGithub = await axios(`https://api.github.com/users/${github_username}`)

    const { name, bio, avatar_url } = apiGithub.data

    const dev = {
        github_username,
        techs,
        location: [latitude, longitude],
        name,
        bio,
        avatar_url,
    }

    const connection = await Postgres.connect()
    const model = await Postgres.defineModel(connection, schemaDevs)
    const ContextPostgres = new Context(new Postgres(model))

    const results = await ContextPostgres.create(dev)

    res.status(200).json(results)
}

//get
exports.readDevs = async (req, res) => {
    const connection = await Postgres.connect()
    const model = await Postgres.defineModel(connection, schemaDevs)
    const ContextPostgres = new Context(new Postgres(model))

    const results = await ContextPostgres.read()

    res.status(200).json(results)
}

//put
exports.updateDevs = async (req, res) => {
    const id = req.params.id
    const item = req.body

    const connection = await Postgres.connect()
    const model = await Postgres.defineModel(connection, schemaDevs)
    const ContextPostgres = new Context(new Postgres(model))

    const results = await ContextPostgres.update(id, item)

    res.status(200).json(results)
}

//delete
exports.deleteDevs = async (req, res) => {
    const id = req.params.id

    const connection = await Postgres.connect()
    const model = await Postgres.defineModel(connection, schemaDevs)
    const ContextPostgres = new Context(new Postgres(model))

    const results = await ContextPostgres.delete(id)
    
    res.status(200).json(results)
}