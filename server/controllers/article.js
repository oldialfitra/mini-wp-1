const article = require('../models/article')

class Article {

    static createArticle(req, res) {
        if (req.file) {
            article.create({
                title: req.body.title,
                content: req.body.content,
                created_at: new Date(),
                image: req.file.cloudStoragePublicUrl,
                userId: req.body.userId
            })
                .then(function (newArticle) {
                    res.status(201).json(newArticle)
                })
                .catch(function (err) {
                    res.status(500).json(err)
                })
        }
        else {
            article.create({
                title: req.body.title,
                content: req.body.content,
                created_at: new Date(),
                image: '',
                userId: req.body.userId
            })
                .then(function (newArticle) {
                    res.status(201).json(newArticle)
                })
                .catch(function (err) {
                    res.status(500).json(err)
                })
        }
    }

    static getAllArticle(req, res) {
        article
            .find({
                userId: req.params.id
            })
            .populate(userId)
            .populate('tags')
            .then(function (allArticles) {
                res.status(200).json(allArticles)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getOneArticle(req, res) {
        article
            .findById(req.params.id)
            .populate('userId')
            .populate('tags')
            .then(function (oneArticle) {
                res.status(200).json(oneArticle)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static updateArticle(req, res) {
        article
            .findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                    new: true
                })
            .then(function (oneArticle) {
                res.status(200).json(oneArticle)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static deleteArticle(req, res) {
        article
            .findByIdAndDelete(req.params.id)
            .then(function (oneArticle) {
                res.status(200).json(oneArticle)
            })
            .catch(function (err) {
                res.status(500).json(err
                )
            })
    }
}

module.exports = Article