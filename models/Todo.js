const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        refs: 'users'
    },
    todoTitle: {
        type: String,
    },
    todoDescription: {
        type: String
    },
    status: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Todo = mongoose.model('todo', TodoSchema)