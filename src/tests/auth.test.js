const assert = require('assert')
const request = require('supertest')
const api = require('../Server')
let app = {}

const USER_DEFAULT = {
    username: 'wellington',
    password: '1232312',
    email: 'weltossouza@gmai.com'
}

const USER_DEFAULT_INVALID = {
    username: 'wellington',
    password: '12321312',
    email: 'weltossouza@gmai.com'
}  

describe.only('swite de test para autenticação de usuario', () => {
    before(async () => {
        app = await request(api)
    })
    it('autenticar um user /login - deve autenticar um user', async() => {
        const { body, statusCode } = await app.post('/login').send(USER_DEFAULT)
        assert.deepEqual(statusCode, 200)
        assert.deepEqual(body.message, 'token generated successfully!')
        assert.ok(body.token.length > 10)
    })

    it.only('autenticar um user /login - deve retornar messagem de erro dados invalidos', async() => {
        const { body, statusCode } = await app.post('/login').send(USER_DEFAULT_INVALID)
        assert.deepEqual(statusCode, 401)
        assert.deepEqual(body.message, 'username or password invalid!')
    })
})
