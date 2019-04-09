const tag = require('../models/tag')

class Tag {

    static addTag(req, res) {
        tag
        .create({
            name: req.body.name
        })
        .then(function (newTag) {
            res.status(201).json(newTag)
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
    }

    static getAll(req, res) {

    }

    static getOne(req, res) {

    }

    static updateTag(req, res) {

    }

    static deleteTag(req, res) {

    }
}

module.exports = Tag