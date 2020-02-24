const assert = require('assert')
const Mongodb = require('../database/strategies/mongodb/mongodb')
const model = require('../database/strategies/mongodb/schemas/userSchema')
const contextMongodb = require('../database/strategies/base/contextStrategy')
let context = {}

const USER_DEFAULT = {
    username: 'wellington',
    password: '1232312',
    email: 'weltossouza@gmai.com'
}

const USER_DEFAULT_UPDATE = {
    username: 'ismaelKina',
    password: '1232dsfd312',
    email: 'ismaelKina@mail.com'
}

describe('swite de test manipulação de users mongodb', () => {
    before(async () => {
        const connection = await Mongodb.connect()
        context = new contextMongodb(new Mongodb(connection, model))
    })

    it('test connection', async() => {
        const statusConnection = await context.isConnect()
        assert.deepEqual(statusConnection, 'connected')
    })
    
    it('cadastrar user', async() => {
        const { username, password, email } = await context.create(USER_DEFAULT)
        const expected = {
            username,
            password,
            email,
        }
        assert.deepEqual(expected, USER_DEFAULT)
    })

    it('listar users', async () => {
        const [{ username, password, email }] = await context.read(USER_DEFAULT)
        const expected = {
            username,
            password,
            email,
        }
        assert.deepEqual(expected, USER_DEFAULT)
    })

    it('atulizar um user', async () => {
        const [{ _id }] = await context.read(USER_DEFAULT)
        const resutls = await context.update(_id, USER_DEFAULT_UPDATE)
        console.log(resutls)
    })

    it('deletar um user', async () => {
        const [{ _id }] = await context.read(USER_DEFAULT)
        const resutls = await context.delete(_id)
        assert.deepEqual(resutls.n, 1)
    })
})