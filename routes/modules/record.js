const express =require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require("../../models/category");
const moment = require("moment");



router.get('/new', ((req, res) => {
    // console.log('home new router')
    Category.find()
        .lean()
        .then( category => res.render('new',{ category }))
        .catch((error) => console.log(error))

}))

//修改頁面
router.get('/:id/edit', (req, res) => {
    // console.log('edit get router')
    const _id = req.params.id
    const userId = req.user._id
    return Record.findOne({ _id, userId})
        .lean()
        .then( (record) => {
            record.date = moment(record.date).format("YYYY-MM-DD")
            Category.find()
                .lean()
                .then( category => res.render('edit', { record, category }))
        })
        .catch((error) => console.log(error))
})

//修改內容
router.put('/:id/edit', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    // console.log('put edit router')
    return Record.findOne({ _id, userId })
        .then( (record) => {
            Object.assign( record, req.body )

            Category.find({ id : req.body.categoryId })
                .then( category => {
                    record.icon = category[0].icon
                    return record.save()
                } )
        })
        .then( () => res.redirect('/') )
        .catch((error) => console.log(error))
})


//新增
router.post('/new', (req, res) => {
    // console.log('record new router')
    const userId = req.user._id
   return Category.find({ id:req.body.categoryId })
    .lean()
    .then(categoryId => {
        let icon = categoryId[0].icon
        return Record.create({ ...req.body, icon, userId })
    })
    .then( () => res.redirect('/') )
    .catch((error) => console.log(error))
})

//刪除
router.delete('/:id', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    Record.findById({ _id, userId })
        .then( record => record.remove())
        .then( () => res.redirect('/'))
        .catch(error => console.log(error))
})

//類別分類顯示
router.post('/search',(req, res) => {
    const userId = req.user._id
    if ( req.body.categoryId.length < 1 ) { return res.redirect('/') }
    if ( req.body.categoryId == 0) { return res.redirect('/') }

    Record.find({ categoryId: req.body.categoryId, userId })
        .lean()
        .then( record => {
            let totalAmount = 0

                record.forEach( (records) => {
                    totalAmount += records.amount
                    records.date = moment(records.date).format("YYYY/MM/DD")
                })

            let nowCategory = ''
                Category.find().lean().sort({id:1}).then( category => {
                    if (record.length > 0){
                        nowCategory = record[0].categoryId
                        return  res.render('index', {record, category, totalAmount,  nowCategory})
                    }else {
                        nowCategory = req.body.categoryId
                        return  res.render('index', {record, category, totalAmount,  nowCategory})
                    }
                })

        }).catch((error) => console.log(error))
})

module.exports = router