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
    created_at: {
        type: Date,
        required: [true, 'date created required']
    },
    image: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'mini-wp-user'
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'mini-wp-tag'
    }]
})

const Article = mongoose.model('mini-wp-article', articleSchema)
module.exports = Article