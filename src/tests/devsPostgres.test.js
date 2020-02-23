const assert = require('assert')
const Postgres = require('../db/strategies/postgres/postegres')
const ContextPostgres = require('../db/strategies/base/contextStrategy')
const schemaDevs = require('../db/strategies/postgres/schemas/devSchema')
let context = {}

const DEV_DEFAULT = {
    name: 'wellington',
    github_username: 'wellingtonn96',
    bio: 'sou um profissional muito capaz',
    avatar_url: 'https://localhost:3000/devs',
    techs: 'Nodejs, Reatjs e React Native',
    location: [1.545, 1.545],
    created_at: new Date(),
    updated_at: new Date()
}

const DEV_DEFAULT_ATUALIZAR = {
    name: 'Diego Fernades',
    github_username: 'Diego@Rocketseat',
    bio: 'sou um profissional muito capaz',
    avatar_url: 'https://localhost:3000/devs',
    techs: 'Nodejs, Reatjs e React Native',
    location: [1.545, 1.545],
    created_at: new Date(),
    updated_at: new Date()
}

describe('swite de tests devs', () => {
    before(async() => {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, schemaDevs)
        context = new ContextPostgres(new Postgres(model))
    })

    it('cadastrar um dev', async() => {
        const { dataValues } = await context.create(DEV_DEFAULT)
        delete dataValues.id
        assert.deepEqual(dataValues, DEV_DEFAULT) 
    })

    it('listar devs', async() => {
        const [results] = await context.read(DEV_DEFAULT);
        delete results.id
        assert.deepEqual(results, DEV_DEFAULT)
    })

    it('atualizar um dev', async() => {
        const [item] = await context.read()
        const [results] = await context.update(item.id, DEV_DEFAULT_ATUALIZAR) 
        assert.deepEqual(results, 1)
    })

    it('excluir um dev', async() => {
        const [item] = await context.read()
        const results = await context.delete(item.id)
        assert.deepEqual(results, 1)
    })
})