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

exports.login = (req, res) => {
    const { username, password } = req.body
    if(username !== USER_DEFAULT.username && password !== USER_DEFAULT.password) {
        return res.status(401).json({ message: 'username or password invalid!'})
    }
    
    const token = JWT.sign({
        username: USER_DEFAULT.username
    }, BASE_TOKEN.secret)

    return res.status(200).json({ token })
}
