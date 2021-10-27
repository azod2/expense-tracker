const express = require('express')
const router = express.Router()



router.get('/', (req,res) => {
    // console.log('home router')
    res.render('index')
})

router.get('/new', ((req, res) => {
    console.log('new router')
    res.render('new')
}))

router.get('/edit', (req, res) => {
    console.log('edit get router')
    res.render('edit')
})

module.exports = router