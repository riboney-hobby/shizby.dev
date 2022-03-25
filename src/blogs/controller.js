const express = require('express')

const blogService = require('./service')
const logger = require('../globals/logger')
const {fetchResource} = require('../globals/helpers')

const router = express.Router()

const getAll = async (req, res, next) => {
    try{
        res.json(await fetchResource(blogService.getAll))
    } catch (err){
        logger.error(`Error in blogs.controller.getAll()\n ${err}`)
        next(err)
    }
}

const getById = async (req, res, next) => {
    try{
        res.json(await fetchResource(blogService.getById, req.params.id))
    } catch (err){
        logger.error(`Error in blogs.controller.getById()\n ${err}`)
        next(err)
    }
}

const getBySlug = async (req, res, next) => {
    try{
        res.json(await fetchResource(blogService.getBySlug, req.params.slug))
    } catch (err){
        logger.error(`Error in blogs.controller.getBySlug()\n ${err}`)
        next(err)
    }
}

const post = async (req, res, next) => {
    try{
        const newBlog = await blogService.post(req.body)
        res.redirect(`/blogs/${newBlog.slug}`)
    } catch (err){
        logger.error(`Error in blogs.controller.post()\n ${err}`)
        next(err)
    }
}

const updateById = async (req, res, next) => {
    try{
        const newBlog = await blogService.updateById(req.params.id, res.body)
        res.redirect(`/blogs/${newBlog.slug}`)
    } catch (err){
        logger.error(`Error in blogs.controller.post()\n ${err}`)
        next(err)
    }
}

const removeById = async (req, res, next) => {
    try{
        const deletedBlog = await blogService.removeById(req.params.id) 
        return deletedBlog ? res.status(204).json(deletedBlog): res.status(404).end()
    } catch (err){
        
    }
}

router.get('/', getAll)
router.get('/:id', getById)
router.get('/blog/:slug', getBySlug)
router.post('/', post)
router.put('/update/:id', updateById)
router.delete('/:id', removeById)

module.exports = router