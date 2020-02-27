const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { 
    promisify
 } = require('util')

const USER_DEFAULT = {
    username: 'wellington',
    password: '1232312',
    email: 'weltossouza@gmai.com'
}

const BASE_TOKEN = {
    secret: 'MEU SEGREDAO'
}

const SALT = 3

async function main() {

    const hash = await promisify(bcrypt.hash)(USER_DEFAULT.password, SALT)

    const compare = await promisify(bcrypt.compare)(USER_DEFAULT.password, hash)

    const token = JWT.sign({
        username: USER_DEFAULT.username
    }, BASE_TOKEN.secret)

    const compareToken = await promisify(JWT.verify)(token, BASE_TOKEN.secret)

    console.log(`
        Hash: ${hash},
        Compare Hash: ${compare},
        Token: ${token}
        Compare Token: ${compareToken.username}
    `)
}

main()