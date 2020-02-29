const JWT = require('jsonwebtoken')
const { 
    promisify
} = require('util')

const authConfig = require('../../config/auth')

exports.authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization
    
    if(!token) return res.status(401).json({ error: 'Token does not provided!'}) 
    
    try {
        const compareToken = await promisify(JWT.verify)(token, authConfig.secret)
        
        req.username =  compareToken.username
        
        return next()  
    } catch (error) {
        return res.json({ error: 'Token invalid!'})
    }
}