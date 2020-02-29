const Mongoose = require('mongoose');
Mongoose.connect('mongodb://localhost:27017/devs_location', { useNewUrlParser: true, useUnifiedTopology: true});

const connection = Mongoose.connection

connection.once('open', () => console.log('database rondando'))

const userSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true  
    },
    password: {
        type: String,
        required: true  
    },
    email: {
        type: String,
        required: true  
    },
    insertAt: {
        type: Date,
        default: new Date()
    }
}, { timestamps: true });

const model = Mongoose.model('User', userSchema)

async function main() {
    //create
    const resultsCreate = await model.create({
        username: 'wellingdton96',
        password: '1232312',
        email: 'weltossouddza@gmai.com'
    })
    console.log('create user', resultsCreate)
    //read 
    const resultsRead = await model.find({ username: 'wellington'})
    console.log('find users', resultsRead)
    //update
    const resultsUpdate = await model.updateMany({ username: 'wellington'}, { $set: { username: 'seleste'}})
    console.log('update many users', resultsUpdate)
    //delete
    const deleteUser = await model.deleteMany({ username: 'seleste'})
    console.log('delete many users', deleteUser)
}

main()