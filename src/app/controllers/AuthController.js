const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Context = require('../../database/strategies/base/contextStrategy')
const Mongodb = require('../../database/strategies/mongodb/mongodb')
const userSchema = require('../../database/strategies/mongodb/schemas/userSchema')

const { 
    promisify   
} = require('util')

const authConfig = require('../../config/auth')

class AuthController {
    static async login(req, res) {
        const { username, password } = req.body
        
        const connection = await Mongodb.connect()
        const ContextMongodb = new Context(new Mongodb(connection, userSchema))    

        const [user] = await ContextMongodb.read({ username })

        if(!user) return res.status(401).json({ message: 'username or password invalid!'})

        const compare = await promisify(bcrypt.compare)(password, user.password)
    
        if(compare) {
            const token = JWT.sign({
                username,
            }, authConfig.secret)
    
            return res.status(200).json({ token, message: 'token generated successfully!' })
        }
      
        return res.status(401).json({ message: 'username or password invalid!'})
    }
}

module.exports = AuthController
    