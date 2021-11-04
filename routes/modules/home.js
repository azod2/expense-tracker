const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require("../../models/category");
const moment = require('moment')


//index
router.get('/', (req,res) => {
    const userId = req.user._id
    let totalAmount = 0
    Record.find({ userId })
        .lean()
        .then( (record) =>{
            record.forEach( (records) => {
                totalAmount += records.amount
                records.date = moment(records.date).format("YYYY/MM/DD")
            })
            Category.find()
                .lean()
                .sort({id:1})
                .then( category => res.render('index', { record, category ,totalAmount}))
        })
        .catch((error) => console.log(error))
})



module.exports = router