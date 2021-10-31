const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require("../../models/category");


//index
router.get('/', (req,res) => {
    const userId = req.user._id
    let totalAmount = 0
    Record.find({ userId })
        .lean()
        .then( (record) =>{
            // res.render('index', {record})
            record.forEach( (records) => {
                totalAmount += records.amount
            })
            Category.find()
                .lean()
                .then( category => res.render('index', { record, category ,totalAmount}))
        })
        .catch((error) => console.log(error))
})



module.exports = router