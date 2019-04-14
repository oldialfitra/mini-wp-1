const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title required']
    },
    content: {
        type: String,
        required: [true, 'content required']
    },
    featured_image: {
        type: String,
        required: [true, 'image required']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'mini-wp-user'
    },
    tags: [{
        type: String
    }]
}, {
        timestamps: {}
    })

const Article = mongoose.model('mini-wp-article', articleSchema)
module.exports = Article