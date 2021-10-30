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
        type: String
    },
    amount: {
        type: Number,
        required:true
    },
    userId: {
        type: Number,
        required: false
    },
    categoryId: {
        type: Number,
        required: false
    },
    icon: {
        type: String,
        default: '_',
        required: true
    }
})

module.exports = mongoose.model('Record', recordSchema)