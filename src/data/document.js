const mongoose = require('mongoose')

const jsonTransformer = {
    transform: (doc, result) => {
        result.id = result._id.toString()
        delete result._id
        delete result.__v
    }
} 

const mongooseModel = (name, paths) => {
    const blogSchema = new mongoose.Schema(paths)

    blogSchema.set('toJSON', jsonTransformer)

    return mongoose.model(name, blogSchema)
}

module.exports = mongooseModel