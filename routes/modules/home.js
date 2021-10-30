const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')


//index
router.get('/', (req,res) => {
    Record.find()
        .lean()
        .then( record => res.render('index', {record}))
        .catch((error) => console.log(error))
})



module.exports = router