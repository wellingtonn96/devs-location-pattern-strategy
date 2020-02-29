const request = require('supertest')
const assert = require('assert')
const api = require('../Server')

let app = {}

const URL = '/devs'

const DEV_DEFAULT = {
	github_username: "diego3g",
	techs: "Nodejs, React e React Native",
	latitude: 46545,
	longitude: 45465
}	

const DEV_DEFAULT_INVALID = {
	github_username: "diego3gS",
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

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndlbGxpbmd0b24iLCJpYXQiOjE1ODI5ODc0MzF9.wpj-mLeKjNH6uafuC7_9xFIOS-MaH-O2-vFk-Px0-PI'

describe('swite de test api devs', () => {
    before(async() => {
        app = await request(api)
    })
    it('cadastrar /devs - deve cadastrar um deve', async() => {
        const { statusCode, body } = await app.post(URL).send(DEV_DEFAULT).set('Authorization', TOKEN)
        assert.deepEqual(statusCode, 200)
        assert.deepEqual(body.data.github_username, "diego3g")
    })

    it('cadastrar /devs - deve retornar messagem de erro se o usuario não existir no github', async() => {
        const { statusCode, body } = await app.post(URL).send(DEV_DEFAULT_INVALID).set('Authorization', TOKEN)
        assert.deepEqual(statusCode, 500)
        assert.deepEqual(body.message, "Internal Server Error")
    })

    it('listar /devs - deve listar dev', async() => {
        const { body, statusCode } = await app.get(URL).set('Authorization', TOKEN)
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(body))
    })

    it('atualizar /devs/id - deve ataualizar um dev', async () => {
        const { body } = await app.get(URL).set('Authorization', TOKEN)
        const [{ id }] = body
        const results = await app.put(`${URL}/${id}`).send(DEV_DEFAULT_UPDATE).set('Authorization', TOKEN)
        assert.deepEqual(results.statusCode, 200)
        assert.deepEqual(results.body, [1])
    })

    it('deletar /devs/id - deve excluir um dev', async() => {
        const { body } = await app.get(URL).set('Authorization', TOKEN)
        const [{ id }] = body
        const results = await app.delete(`${URL}/${id}`).set('Authorization', TOKEN)
        assert.deepEqual(results.statusCode, 200)
        assert.deepEqual(results.body, 1)
    })
})  