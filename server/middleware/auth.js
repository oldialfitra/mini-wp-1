const jwt = require('jsonwebtoken'),
    Article = require('../models/article')

module.exports = {
    authentication(req, res, next) {
        if (req.headers.hasOwnProperty('token')) {
            try {
                req.userLoggedIn = jwt.verify(req.headers.token, process.env.SECRET)
                console.log(req.userLoggedIn)
                next();
            }
            catch {
                res.status(401).json({ message: `You are not Authenticate` })
            }
        }
        else {
            res.status(401).json({ message: `Login First` })
        }
    },
    authorization(req, res, next) {
        Article
        .findById(req.params.id)
        .then(function (oneArticle) {
            if (oneArticle.author.toString() === req.userLoggedIn.id.toString()) {
                next()
            }
            else {
                res.status(401).json({
                    message: 'You are not authorized'
                })
            }
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
    }
}