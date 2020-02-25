const request = require('supertest')
const assert = require('assert')
const api = require('../index')

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

describe.only('swite de test api devs', () => {
    before(async() => {
        app = await request(api)
        await app.post(URL).send(DEV_DEFAULT)
    })
    it('cadastrar /devs', async() => {
        const results = await app.post(URL).send(DEV_DEFAULT)
        assert.deepEqual(results.statusCode, 200)
        assert.deepEqual(results.body.github_username, "diego3g")
    })

    it('listar /devs', async() => {
        const { body, statusCode } = await app.get(URL)
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(body))
    })

    it('atualizar /devs', async () => {
        const { body } = await app.get(URL)
        const [{ id }] = body
        const results = await app.put(`${URL}/${id}`).send(DEV_DEFAULT_UPDATE)
        assert.deepEqual(results.statusCode, 200)
        assert.deepEqual(results.body, [1])
    })

    it('deletar /devs', async() => {
        const { body } = await app.get(URL)
        const [{ id }] = body
        const results = await app.delete(`${URL}/${id}`)
        assert.deepEqual(results.statusCode, 200)
        assert.deepEqual(results.body, 1)
    })
})