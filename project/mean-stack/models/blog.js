const mongoose = require('mongoose')
var ObjectId =mongoose.Types.ObjectId

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        required: true
    }
})

const Blog = module.exports = mongoose.model('Blog', BlogSchema)

module.exports.addBlog = (newBlog, callback) => {
    newBlog.save(callback)
}

module.exports.getBlogsByAuthor = (author, callback) => {
    const query = { author: author}
    Blog.find(query, callback)
}