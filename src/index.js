const express = require('express')
const app = express()

app.use(express.json())

app.use('/devs', require('./routes/devsRoutes'))

app.listen(3000, () => console.log('Web server running on port 3000'))