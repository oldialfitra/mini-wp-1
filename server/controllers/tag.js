const tag = require('../models/tag')

class Tag {

    static getAll(req, res) {
        tag
            .find()
            .populate({
                path: 'articles',
                populate: {
                    path: 'author'
                }
            })
            .then(function (allTags) {
                res.status(200).json(allTags)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getOne(req, res) {
        tag
            .findOne({
                name: req.query.name
            })
            .populate('articles')
            .then(function (oneTag) {
                res.status(200).json(oneTag)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }
}

module.exports = Tag