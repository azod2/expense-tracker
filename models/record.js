const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    date: {
        type: Date
    },
    amount: {
        type: Number,
        required:true
    },
    userId: {
        type: Number,
        required: true
    },
    categoryId: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Record', recordSchema)