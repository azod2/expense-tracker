if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category.js')
const categoryList = require('../../seed_data/category.json')

db.on('error', () => {
    console.log('fail to connect to mongo db!')
})

db.once('open', () => {
    Promise.all(
        categoryList.category.map((category, index) => {
            if (category.name != null){
                return Category.create({...category})
            }
    }))
        .then(() => {
            console.log('done')
            process.exit()
        })
        .catch((err) => console.log(err))
})