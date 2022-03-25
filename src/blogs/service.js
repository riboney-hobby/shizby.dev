const Blog = require('./model')
const dao = require('./dao')
const CompileError = require('../globals/errors')

const getAll = async () => {
    const blogs = await dao.getAll()
    
    return blogs.length === 0 ? null: blogs
}

const getById = async id => {
    if(!id) throw new CompileError('Required id argument is missing')

    const blog = await dao.getById(id)

    return !blog ? null: blog
}

const getBySlug = async slug => {
    if(!slug) throw new CompileError('Required slug argument is missing')

    const blog = await dao.getBySlug(slug)

    return !blog ? null: blog
}

const post = async data => {
    // data is validated by Blog()
    const newBlog = new Blog(data)

    return await dao.post(newBlog)
}

const updateById = async (id, data) => {
    if(!id) throw new CompileError('Required id argument is missing')
    const newBlog = new Blog(data)

    return await dao.updateById(id, newBlog)
}

const removeById = async () => {
    if(!id) throw new CompileError('Required id argument is missing')

    return dao.removeById(id)
}

module.exports = {
    getAll,
    getById,
    getBySlug,
    post,
    updateById,
    removeById
}