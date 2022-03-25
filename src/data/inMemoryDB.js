const {MongoMemoryServer} = require('mongodb-memory-server')

const startMongoInstance = () => MongoMemoryServer.create({dbName: 'devDB'})
const getMongoURI = mongoInstance => mongoInstance.getUri()
const stopMongoInstance = mongoInstance => mongoInstance.stop()

module.exports = {
    startMongoInstance,
    stopMongoInstance,
    getMongoURI
}

