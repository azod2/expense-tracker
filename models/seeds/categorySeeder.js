if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const db = require('../../config/mongoose')
const category = require('../category.js')
const categoryList = require('../../seed_data/category.json')

db.on('error', () => {
    console.log('fail to connect to mongo db!')
})

db.once('open', () => {
    return Promise.all(
        categoryList.category.map((categorys, index) => {
            if (categorys.name != null){
                return category.create({...categorys})
            }
    }))
})