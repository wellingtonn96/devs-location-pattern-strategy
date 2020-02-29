const request = require('supertest')
const assert = require('assert')
const api = require('../index')
let TOKEN = {}

let app = {}

const URL = '/devs'

const DEV_DEFAULT = {
	github_username: "diego3g",
	techs: "Nodejs, React e React Native",
	latitude: 46545,
	longitude: 45465
}	

const DEV_DEFAULT_UPDATE = {
	github_username: "wellingtonn96",
	techs: "Nodejs, React e React Native",
	latitude: 46545,
	longitude: 45465
}

const USER_AUTH = {
	username: "wellington",
	password: "1232312"
}

describe('swite de test api devs', () => {
    before(async() => {
        app = await request(api)
        await app.post(URL).send(DEV_DEFAULT)
        const { body } = await app.post('/login').send(USER_AUTH)
        TOKEN = body.token
    })
    it('cadastrar /devs - deve cadastrar um deve', async() => {
        const results = await app.post(URL).send(DEV_DEFAULT).set('Authorization', TOKEN)
        assert.deepEqual(results.statusCode, 200)
        assert.deepEqual(results.body.github_username, "diego3g")
    })

    it('listar /devs - deve listar devs', async() => {
        const { body, statusCode } = await app.get(URL).set('Authorization', TOKEN)
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(body))
    })

    it('atualizar /devs/id - deve ataualizar um deve', async () => {
        const { body } = await app.get(URL).set('Authorization', TOKEN)
        const [{ id }] = body
        const results = await app.put(`${URL}/${id}`).send(DEV_DEFAULT_UPDATE).set('Authorization', TOKEN)
        assert.deepEqual(results.statusCode, 200)
        assert.deepEqual(results.body, [1])
    })

    it('deletar /devs/id', async() => {
        const { body } = await app.get(URL).set('Authorization', TOKEN)
        const [{ id }] = body
        const results = await app.delete(`${URL}/${id}`).set('Authorization', TOKEN)
        assert.deepEqual(results.statusCode, 200)
        assert.deepEqual(results.body, 1)
    })
})