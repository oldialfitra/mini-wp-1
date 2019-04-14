const user = require('../models/user'),
    jwt = require('jsonwebtoken'),
    { decrypt } = require('../helpers/bcrypt'),
    { OAuth2Client } = require('google-auth-library'),
    client = new OAuth2Client(process.env.CLIENT_ID);
class User {

    static signUp(req, res) {
        user
            .create({
                email: req.body.email,
                password: req.body.password
            })
            .then(function (newUser) {
                res.status(201).json(newUser)
            })
            .catch(function (err) {
                if(err.errors.email) {
                    res.status(400).json({
                        message: err.errors.email.message
                    })
                } else if(err.errors.password) {
                    res.status(400).json({
                        message: err.errors.password.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static signIn(req, res) {
        user
            .findOne({
                email: req.body.email
            })
            .then(function (uLogin) {
                if (!uLogin) {
                    res.status(400).json({
                        message: 'Username or password wrong'
                    })
                } else {
                    if (!decrypt(req.body.password, uLogin.password)) {
                        res.status(400).json({
                            message: 'Username or password wrong'
                        })
                    } else {
                        let token = jwt.sign({
                            email: uLogin.email,
                            id: uLogin._id
                        }, process.env.SECRET)
                        let obj = {
                            token,
                            id: uLogin._id
                        }
                        res.status(200).json(obj)
                    }
                }
            })
            .catch(function (err) {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static signInGoogle(req, res) {
        console.log('masuk ke controller google')
        var newEmail = ''
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.CLIENT_ID
        })
            .then(function (ticket) {
                console.log(ticket)
                console.log('masuk ke then 1')
                newEmail = ticket.getPayload().email
                return user.findOne({
                    email: newEmail
                })
            })
            .then(function (userLogin) {
                console.log('masuk ke then 2')
                console.log(userLogin)
                if (!userLogin) {
                    return user.create({
                        email: newEmail,
                        password: 'password'
                    })
                } else {
                    return userLogin
                }
            })
            .then(function (newUser) {
                console.log('masuk ke then 3')
                let token = jwt.sign({
                    email: newUser.email,
                    id: newUser._id
                }, process.env.SECRET)
                let obj = {
                    token,
                    id: newUser._id
                }
                res.status(200).json(obj)
            })
            .catch(function (err) {
                if (err.errors.email) {
                    res.status(400).json({
                        message: err.errors.email.message
                    })
                } else if (err.errors.password) {
                    res.status(400).json({
                        message: err.errors.password.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }
}

module.exports = User