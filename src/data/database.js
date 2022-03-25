const driver = require('./driver')
const localDb = require('./inMemoryDB')

let mongod

const startDB = async (URI) => {
    if(!URI){
        mongod = await localDb.startMongoInstance()
        URI = localDb.getMongoURI(mongod)
    }

    return await driver.connect(URI)
}

const stopDB = async () => {
    await driver.disconnect()
    if(mongod)
        localDb.stopMongoInstance(mongod)
    
    return await driver.disconnect()
}

const watchDB = () => {
    driver.connectionStatus()
}

module.exports = {
    startDB,
    stopDB,
    watchDB
}