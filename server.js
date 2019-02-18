require('dotenv').load();
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser')
const users = require('./routes/api/users')
const tasks = require('./routes/api/tasks')
const passport = require('passport')
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// app.use(cors({
//     'origin': '*',
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
// }));

mongoose.connect(process.env.mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))


app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/users', users)
app.use('/api/tasks', tasks)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})