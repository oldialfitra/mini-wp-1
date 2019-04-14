const tag = require('../models/tag')

module.exports = {
    checkTags(tags, id) {
        tag
        .findOne({
            name: tags
        })
        .then(function (oneTag) {
            if (!oneTag) {
                return tag
                .create({
                    name: tags,
                    articles: [id]
                })
            }
            else {
                return tag
                .findOneAndUpdate({
                    name: tags
                }, {
                    $push: {
                        articles: id
                    }
                })
            }
        })
        .then(function (oneTag) {
            console.log('helper tag done')
        })
        .catch(function (err) {
            throw new Error({
                message: err
            })
        })
    }
}
