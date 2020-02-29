const assert = require('assert')
const Mongodb = require('../database/strategies/mongodb/mongodb')
const model = require('../database/strategies/mongodb/schemas/userSchema')
const contextMongodb = require('../database/strategies/base/contextStrategy')
let context = {}

const USER_DEFAULT = {
    username: 'ismaelKina',
    password: '1232dsfd312',
    email: 'ismaelKina@mail.com'
}

describe('swite de test manipulação de users mongodb', () => {
    before(async () => {
        const connection = await Mongodb.connect()
        context = new contextMongodb(new Mongodb(connection, model))

        await context.create(USER_DEFAULT)
    })

    it('test connection', async() => {
        const statusConnection = await context.isConnect()
        assert.deepEqual(statusConnection, 'connected')
    })
    
   it('cadastrar user - deve cadastrar um user no mongo', async() => {
        const user = { 
            username: Math.random().toString(),
            password: 'coraScsaovalente',
            email: Math.random().toString().concat('@gmail.com')
        }
        const { username, password, email } = await context.create(user)
        const expected = {
            username,
            password,
            email,
        }
        assert.deepEqual(expected, user)
    })
 
    it('listar users - deve listar um user atraves do username', async () => {
        const [{ username, email }] = await context.read({ username: USER_DEFAULT.username})
        const expected = {
            username,
            email,
        }
        delete USER_DEFAULT.password
        assert.deepEqual(expected, USER_DEFAULT)
    })

    // it('atulizar um user', async () => {
    //     const [{ _id }] = await context.read(USER_DEFAULT)
    //     const resutls = await context.update(_id, USER_DEFAULT_UPDATE)
    //     console.log(resutls)
    // })

    it('deletar um user - deve excluir um user', async () => {
        const [{ _id }] = await context.read({ username: USER_DEFAULT.username })
        const resutls = await context.delete(_id)
        assert.deepEqual(resutls.n, 1)
    })
})