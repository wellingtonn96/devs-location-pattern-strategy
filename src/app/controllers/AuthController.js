const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Context = require('../../database/strategies/base/contextStrategy')
const Mongodb = require('../../database/strategies/mongodb/mongodb')
const userSchema = require('../../database/strategies/mongodb/schemas/userSchema')
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


class AuthController {
    static async login(req, res) {
        const { username, password } = req.body
        
        const connection = await Mongodb.connect()
        const ContextMongodb = new Context(new Mongodb(connection, userSchema))    

        const [user] = await ContextMongodb.read({ username })
    
        const compare = await promisify(bcrypt.compare)(password, user.password)
    
        if(compare) {
            const token = JWT.sign({
                username: USER_DEFAULT.username
            }, BASE_TOKEN.secret)
    
            return res.status(200).json({ token, message: 'token generated successfully!' })
        }
      
        return res.status(401).json({ message: 'username or password invalid!'})
    }
}

module.exports = AuthController
    