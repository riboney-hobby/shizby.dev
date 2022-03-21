const server = require('./http/server')
const logger = require('./globals/logger')
const env = require('./globals/env')

const bootUp = async () => {
    try{
        logger.info('Booting up application!')
        const promises = [
            server.connect(env.PORT, env.HOSTNAME)
        ]

        const connections = await Promise.all(promises)
        return connections[0]
    } catch (err) {
        logger.error(`Error in booting application!\n${err}`)
        process.exit(1)
    }
}

const bootDown = async (server) => {
    try{
        logger.info('Booting down application!')
        await Promise.all([
            server.disconnect(server)
        ])

        process.exit(0)
    } catch(err){
        logger.error('Error in booting down application\n${err}')
        process.exit(1)
    }
}

const main = async () => {
    const http = await bootUp()
    process.on('SIGINT', async () => await bootDown(server))
}

main()