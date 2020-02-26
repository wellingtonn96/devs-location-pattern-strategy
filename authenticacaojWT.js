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

const hashAsync = promisify(bcrypt.hash)
const compareAsync = promisify(bcrypt.compare)
const SALT = 3

async function main() {

    const hash = await hashAsync(USER_DEFAULT.password, SALT)

    const compare = await compareAsync(USER_DEFAULT.password, hash)

    const token = JWT.sign({
        username: USER_DEFAULT.username
    }, 'MEU SEGREDAO')

    console.log(`
        Hash: ${hash},
        Compare: ${compare},
        Token: ${token}
    `)
}

main()