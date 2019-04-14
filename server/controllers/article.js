const article = require('../models/article'),
    { checkTags } = require('../helpers/tagHelper')

class Article {

    static createArticle(req, res) {
        console.log('masuk ke add')
        // console.log(req.body)
        // let allTags = []
        // if (req.body.tags.length > 0) {
            
        // }
        let allTags = req.body.tags.split(',')
        // console.log(req.file)
        console.log(req.userLoggedIn, 'ini id')
        if (req.file) {
            console.log('masuk ke if 1')
            article.create({
                title: req.body.title,
                content: req.body.content,
                featured_image: req.file.cloudStoragePublicUrl,
                tags: allTags,
                author: req.userLoggedIn.id
            })
                .then(function (newArticle) {
                    if (newArticle.tags.length > 0) {
                        newArticle.tags.forEach(e => {
                            console.log(newArticle._id)
                            checkTags(e, newArticle._id)
                        });
                    }
                    res.status(201).json(newArticle)
                })
                .catch(function (err) {
                    if (err.errors.title) {
                        res.status(400).json({
                            message: err.errors.title.message
                        })
                    } else if (err.errors.content) {
                        res.status(400).json({
                            message: err.errors.content.message
                        })
                    } else if (err.errors.featured_image) {
                        res.status(400).json({
                            message: err.errors.featured_image.message
                        })
                    } else {
                        res.status(500).json(err)
                    }
                })
        }
        else {
            console.log('masuk ke else 1')
            article.create({
                title: req.body.title,
                content: req.body.content,
                created_at: new Date(),
                image: '',
                tags: tag,
                userId: req.body.userId
            })
                .then(function (newArticle) {
                    if (newArticle.tags.length > 0) {
                        newArticle.tags.forEach(e => {
                            console.log(newArticle._id)
                            checkTags(e, newArticle._id)
                        });
                    }
                    res.status(201).json(newArticle)
                })
                .catch(function (err) {
                    if (err.errors.title) {
                        res.status(400).json({
                            message: err.errors.title.message
                        })
                    } else if (err.errors.content) {
                        res.status(400).json({
                            message: err.errors.content.message
                        })
                    } else if (err.errors.featured_image) {
                        res.status(400).json({
                            message: err.errors.featured_image.message
                        })
                    } else {
                        res.status(500).json(err)
                    }
                })
        }
    }

    static getAllArticle(req, res) {
        console.log('all article')
        article
            .find()
            .populate('author')
            .sort({
                updatedAt: 'desc'
            })
            .then(function (allArticles) {
                res.status(200).json(allArticles)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getMyArticle(req, res) {
        article
        .find({
            author: req.userLoggedIn.id
        })
        .populate('author')
        .then(function (myArticles) {
            res.status(200).json(myArticles)
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
    }

    static getOneArticle(req, res) {
        console.log('masuk ke get one controller')
        article
            .findById(req.params.id)
            .populate('author')
            .then(function (oneArticle) {
                res.status(200).json(oneArticle)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static updateArticle(req, res) {
        console.log(req.body, 'ini req.body')
        // console.log(req.body, 'ini reqbody')
        // let allTags = []
        // if (req.body.tags.length > 0) {
        //     allTags = req.body.tags.split(',')
        // }
        // req.body.tags = allTags
        article
            .findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                content: req.body.content,
                featured_image: req.file.cloudStoragePublicUrl,
                tags: req.body.tags,
                author: req.userLoggedIn.id
            }, {
                    new: true
                })
            .then(function (oneArticle) {
                if (oneArticle.tags.length > 0) {
                    oneArticle.tags.forEach(e => {
                        console.log(oneArticle._id)
                        checkTags(e, oneArticle._id)
                    });
                }
                res.status(200).json(oneArticle)
            })
            .catch(function (err) {
                if (err.errors.title) {
                    res.status(400).json({
                        message: err.errors.title.message
                    })
                } else if (err.errors.content) {
                    res.status(400).json({
                        message: err.errors.content.message
                    })
                } else if (err.errors.featured_image) {
                    res.status(400).json({
                        message: err.errors.featured_image.message
                    })
                } else {
                    res.status(500).json(err)
                }
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