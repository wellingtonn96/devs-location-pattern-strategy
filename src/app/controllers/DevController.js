const axios = require('axios')
const Boom = require('boom')

const Context = require('../../database/strategies/base/contextStrategy')
const Postgres = require('../../database/strategies/postgres/postegres')
const schemaDevs = require('../../database/strategies/postgres/schemas/devSchema')
const Yup = require('yup')

//post
class DevController {
    static async createDevs(req, res) {
        try {
            const schema = Yup.object().shape({
                github_username: Yup.string().required(),
                techs: Yup.string().required(),
                latitude: Yup.number().required().min(10),
                longitude: Yup.number().required().min(10)
            })
            
            if (!(await schema.isValid(req.body))) {
                return res.status(401).json({ error: 'Validation is failed !' });
            }
    
            const { github_username, techs, latitude, longitude } = req.body

            const connection = await Postgres.connect()
            const model = await Postgres.defineModel(connection, schemaDevs)
            const ContextPostgres = new Context(new Postgres(model))
            
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
    
            const results = await ContextPostgres.create(dev)
    
            return res.status(200).json({ data: results })
        } catch (error) {
            return res.status(500).json(Boom.internal())
        }
    }

    //get
    static async readDevs(req, res) {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, schemaDevs)
        const ContextPostgres = new Context(new Postgres(model))

        const results = await ContextPostgres.read()

        res.status(200).json(results)
    }

    //put
    static async updateDevs(req, res) {
        try {
            const schema = Yup.object().shape({
                github_username: Yup.string().required(),
                techs: Yup.string().required(),
                latitude: Yup.number().required().min(10),
                longitude: Yup.number().required().min(10)
            })
            
            if (!(await schema.isValid(req.body))) {
                return res.status(401).json({ error: 'Validation is failed !' });
            }
    
            const id = req.params.id
            const item = req.body
    
            const connection = await Postgres.connect()
            const model = await Postgres.defineModel(connection, schemaDevs)
            const ContextPostgres = new Context(new Postgres(model))
    
            const results = await ContextPostgres.update(id, item)
    
            res.status(200).json(results)
        } catch (error) {
            return res.status(500).json(Boom.internal())
        }
    }

    //delete
    static async deleteDevs(req, res) {
        const id = req.params.id
        
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, schemaDevs)
        const ContextPostgres = new Context(new Postgres(model))

        const results = await ContextPostgres.delete(id)
        
        res.status(200).json(results)
    }
}

module.exports = DevController
