const slugify = require('slugify')

const fetchResource = async (cb, ...args) => {
    let resultSet
    
    if(args.length === 2)
        resultSet = await cb(args[0], args[1])
    else if(args.length === 1)
        resultSet = await cb(args[0])
    else
        resultSet = await cb()

    if(!resultSet) throw new Error('Resource not found')
    
    return resultSet
}

// src: https://stackoverflow.com/a/29774197
const getCurrentDate = () => {
    let yourDate = new Date()
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset*60*1000))
    
    return yourDate.toISOString().split('T')[0]
}

const slugifyURL = text => slugify(text, {lower: true, strict: true})

module.exports = {
    fetchResource,
    slugifyURL,
    getCurrentDate,
}