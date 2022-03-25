const {Schema} = require('mongoose')
const mongooseModel = require('../data/document')

const blogSchema = {
    title: Schema.Types.String,
    desc: Schema.Types.String,
    body: Schema.Types.String,
    postDate: Schema.Types.Date,
    slug: Schema.Types.String
}

const Blog = mongooseModel('Blog', blogSchema)

module.exports = {
    async getAll(){
        return await Blog.find({}).transform(blogs => blogs.length === 0 ? []: blogs.map(blog => blog.toJSON())).exec()
    },
    async getById(id){
        return await Blog.findById(id).transform(blog => blog.toJSON()).exec()
    },
    async getBySlug(slug){
        return await Blog.findOne({slug: slug}).transform(blog => blog.toJSON()).exec()
    },
    async post(data){
        return (await Blog.create(data)).toJSON()
    },
    async updateById(id, data){
        return (await Blog.findByIdAndUpdate(id, data, {new:true})).toJSON()
    },
    async removeById(id){
        return await Blog.findByIdAndRemove(id)
    }
}