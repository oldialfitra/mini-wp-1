const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const tagSchema = new Schema({
    name: {
        type: String
    },
    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'mini-wp-article'
    }]
}, {
        timestamps: {}
    })

const Tag = mongoose.model('mini-wp-tag', tagSchema)
module.exports = Tag