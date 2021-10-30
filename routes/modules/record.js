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

//修改頁面
router.get('/:id/edit', (req, res) => {
    console.log('edit get router')
    const id = req.params.id

    return Record.findById(id)
        .lean()
        .then( (record) => {
            Category.find()
                .lean()
                .then( category => res.render('edit', { record, category }))
        })
        .catch((error) => console.log(error))
})

//修改內容
router.put('/:id/edit', (req, res) => {
    const _id = req.params.id
    console.log('put edit router')
    return Record.findOne({ _id })
        .then( (record) => {
            Object.assign( record, req.body )

            Category.find({ id : req.body.categoryId })
                .then( categoryid => {
                    let icon = categoryid[0].icon
                    record.icon = icon
                    return record.save()
                } )
        })
        .then( () => res.redirect('/') )
        .catch((error) => console.log(error))
})


//新增
router.post('/new', (req, res) => {
console.log('record new router')
   return Category.find({ id:req.body.categoryId })
    .lean()
    .then(categoryId => {
        let icon = categoryId[0].icon
        return Record.create({ ...req.body, icon })
    })
    .then( () => res.redirect('/') )
    .catch((error) => console.log(error))
})

//刪除
router.delete('/:id', (req, res) => {
    const id = req.params.id

    Record.findById(id)
        .then( record => record.remove())
        .then( () => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router