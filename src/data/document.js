const mongoose = require('mongoose')

const jsonTransformer = {
    transform: (doc, result) => {
        result.id = result._id.toString()
        delete result._id
        delete result.__v
    }
} 

const mongooseModel = (name, paths) => {
    const schema = new mongoose.Schema(paths)

    schema.set('toJSON', jsonTransformer)

    return mongoose.model(name, schema)
}

module.exports = mongooseModel
