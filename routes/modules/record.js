const express =require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require("../../models/category");



router.get('/new', ((req, res) => {
    console.log('home new router')
    Category.find()
        .lean()
        .then( category => res.render('new',{ category }))
        .catch((error) => console.log(error))

}))

router.get('/:id/edit', (req, res) => {
    console.log('edit get router')
    const id = req.params.id


    return Record.findById(id)
        .lean()
        .then( (record) => res.render('edit', {record }))
        // .then( (record) => console.log(record))
        .catch((error) => console.log(error))
})


//新增
router.post('/new', (req, res) => {
console.log('record new router')
return  Record.create({...req.body})
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

router.delete('/:id', (req, res) => {
    console.log('id:',req.params.id)
})

module.exports = router