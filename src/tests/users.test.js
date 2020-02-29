const request = require('supertest')
const assert = require('assert')
const api = require('../index')
let app = {}

const USER_DEFAULT = {
    username: 'wellington',
    password: '1232312',
    email: 'weltossouza@gmai.com'
}  

describe('swite de tests para manipulação de users', () => {
    before(async () => {
        app = await request(api)
    })
    it('cadastrar um user /register - deve cadastrar um usuario ', async() => {
        const user = { 
            username: Math.random().toString(),
            password: 'coraScsaovalente',
            email: Math.random().toString().concat('@gmail.com')
        }
        const { body, statusCode } = await app.post('/register').send(user)
        assert.deepEqual(body.message, 'user created successfully!')
        assert.deepEqual(statusCode, 200)
    })

    it('cadastrar um user /register - deve retornar messagem de erro de validação', async() => {
        delete USER_DEFAULT.password
        const { body, statusCode } = await app.post('/register').send(USER_DEFAULT)
        assert.deepEqual(body.error, 'Validation is failed!')
        assert.deepEqual(statusCode, 401)
    })

    it('cadastrar um user /register - deve retornar messagem de erro de usuario existente!', async() => {      
        const user = {
            username: 'wellington',
            password: '1232312',
            email: 'weltossouza@gmai.com'
        }  
        const { body, statusCode } = await app.post('/register').send(user)
        console.log(body.error)
        assert.deepEqual(body.error, 'user already exists!')
        assert.deepEqual(statusCode, 401)
    })

    // it('remover um user /register/id', async () => {

    // })

    // it('deve listar users /register', async () => {

    // })

})