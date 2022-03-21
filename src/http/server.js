const app = require('./app')
const logger = require('../globals/logger')

const connect = (port, hostname) => {

    const startHTTPServer = (resolve, reject) => {
        const http = app
            .listen(port, () => displayServerInfo(http.address()))
            .on('listening', () => resolve(http))
            .on('error', err => reject(err))
    }

    // helper method
    const displayServerInfo = httpAddressInfo => {
        // TODO: modify hostname to reflect which VPS the app is running on
        logger.info(`Server is running on ${hostname}`)
        // https://nodejs.org/api/net.html#serveraddress
        if(typeof httpAddressInfo === 'object')
            logger.info(`Port: ${httpAddressInfo.port}`)
    }

    return new Promise(startHTTPServer)
}

const disconnect = (server) => {
    return new Promise((resolve, reject) => server
        .close(() => logger.info('HTTP server closed!'))
        .on('close', () => resolve())
        .on('error', () => reject(new Error("HTTP Server doesn't exist!")))
    )
}

module.exports = {
    connect,
    disconnect
}