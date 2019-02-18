const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TasksSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        refs: 'users'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        default: 0
    },
    isHigh: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('tasks', TasksSchema)