const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users')
const bcrypt = require('bcryptjs')

module.exports = (app) => {
    // passport setup
    app.use(passport.initialize())
    app.use(passport.session())

    passport.use(
        // Local Strategy
        new LocalStrategy({ usernameField: 'email', passReqToCallback: true  }, (req, email, password, done) => {
            User.findOne({ email })
                .then((user) => {
                    if (!user) {
                        req.flash('warning_msg', 'That email is not registered!')
                        return done(null, false, {
                            message: 'This email is not registered.'
                        })
                    }
                    return bcrypt.compare(password, user.password).then((isMatch) => {
                        if (!isMatch) {
                            req.flash('warning_msg', 'Email or Password incorrect!')
                            return done(null, false, {
                                message: 'Email or Password incorrect.'
                            })
                        }
                        return done(null, user)
                    })
                })
                .catch((err) => done(err, false))
        })
    )

    // Session
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .lean()
            .then((user) => done(null, user))
            .catch((err) => done(err, null))
    })
}
