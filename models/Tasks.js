const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MonthSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        refs: 'users'
    },
    name: {
        type: String,
        // required: true
    },
    year: {
        type: Number
    },
    tasks: [{

        title: {
            type: String,
            // required: true
        },
        description: {
            type: String,
            // required: true
        },
        time: {
            type: Number,
            default: 0
        }
    }],

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Month = mongoose.model('month', MonthSchema)