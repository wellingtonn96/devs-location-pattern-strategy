const Yup = require('yup')
const bcrypt = require('bcrypt')
const { 
    promisify
 } = require('util')

const Context = require('../../database/strategies/base/contextStrategy')
const Mongodb = require('../../database/strategies/mongodb/mongodb')
const userSchema = require('../../database/strategies/mongodb/schemas/userSchema')


class UserController {
   static async createUser(req, res) {    
        const schema = Yup.object().shape({
            username: Yup.string().required(),
            password: Yup.string().required(),
            email: Yup.string().email(),
        })
    
        if(!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation is failed!'})
        }
    
        const { username, password, email } = req.body
    
        const connection = await Mongodb.connect()
        const ContextMongodb = new Context(new Mongodb(connection, userSchema))
        
        const [usernameExist] = await ContextMongodb.read({ username })
        const [userEmailExist] = await ContextMongodb.read({ email })
    
        if(!usernameExist && !userEmailExist) {
            const hash = await promisify(bcrypt.hash)(password, 8)
    
            const user = {
                username: username.toLowerCase(),
                password: hash,
                email
            }
        
            const results = await ContextMongodb.create(user)
            
            return res.status(200).json({ message: 'user created successfully!', data: results })
        }
    
        return res.status(401).json({ error: 'user already exists!'})
    }   
}

module.exports = UserController