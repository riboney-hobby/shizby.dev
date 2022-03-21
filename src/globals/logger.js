const path = require('path')
const winston = require('winston')

const { format } = winston

// helpers

// https://github.com/winstonjs/winston#filtering-info-objects
// if info.level doesn't match the provided level argument, then return false which means 
//   winston will ignore the log message
const filter = level => format((info, opts) => info.level !== level ? false: info)()

const levels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    http: 5
}

const timeFormat = {format: 'YYYY-MM-DD HH:mm:ss'}

const cliFormat = (level) => format.combine(
    filter(level),
    format.colorize(),
    format.splat(),
    format.printf((item) => `${item.level} - ${item.message}`)
)

const transports = [
    new winston.transports.Console({
        level: 'error',
        format: cliFormat('error')
    }),
    new winston.transports.Console({
        level: 'info',
        format: cliFormat('info')
    }),
    new winston.transports.Console({
        level: 'http',
        format: cliFormat('http')
    }),
    new winston.transports.Console({
        level: 'debug',
        format: cliFormat('debug')
    })
]

module.exports = winston.createLogger({levels, transports})