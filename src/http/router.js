const express = require('express')
const router = express.Router()

const blogsRouter = require('../blogs/controller')

router.get('/', (req, res) => res.status(200).send('Hello World!'))

router.use('/blogs', blogsRouter)

module.exports = router