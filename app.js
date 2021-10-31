if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const routes = require('./routes')
const methodOverride = require('method-override')
const port = process.env.PORT
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

//資料庫連線
require('./config/mongoose')

//使用layout既定格式
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))

usePassport(app)
app.use(flash())

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    next()
})

// CSS
app.use(express.static('public'))

app.use(methodOverride('_method'))

app.use(express.urlencoded({extended: true}))

app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})