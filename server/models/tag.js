const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const articleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'title required']
    }
})

const Article = mongoose.model('mini-wp-tag', articleSchema)
module.exports = Article