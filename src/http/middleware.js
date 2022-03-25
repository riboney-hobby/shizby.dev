const logger = require('../globals/logger')

const errorLogger = (error, req, res, next) => {
    logger.error(`${error}`)
    next(error)
}

const errorHandler = (error, req, res, next) => {
    if(error.message.includes('Timeout')) 
        res.status(503).json({message: `Request timed out`, error: error.message})
    
    // Typically thrown when cast to ObjectID fails
    else if(error.name === 'CastError') 
        res.status(400).json({message: 'Invalid ID!', error: error.message}) 
    
    // thrown from mongoose schema validation failure
    else if(error instanceof TypeError) 
        res.status(400).json({error: error.name}) 
    
    else if(error.message.includes('Resource not found')) 
        res.status(404).json({message: 'Resource not found', METHOD: `${req.method}`, PATH: `${req.path}`})
    
    else 
        res.status(503).json({message: `Could not process request`, error: error.message})
}

// connect-timedout 
// https://github.com/expressjs/timeout
const httpTimeout = (req, res, next) => {
    if(!req.timedout) next()
    else {
        try{
            throw new Error(`Timeout error, METHOD: ${req.method}, PATH: '${req.path}'`)
        } catch(err){
            logger.error('error thrown in httptimeout')
            next(err)
        }
    }
}

module.exports = {
    errorLogger,
    errorHandler,
    httpTimeout,
}