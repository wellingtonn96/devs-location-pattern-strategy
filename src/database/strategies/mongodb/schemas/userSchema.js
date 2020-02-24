const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true  
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    insertAt: {
        type: Date,
        default: new Date()
    }
}, { timestamps: true });
    
module.exports = Mongoose.model('User', userSchema)

