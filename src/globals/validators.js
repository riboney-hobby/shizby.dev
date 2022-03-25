const {CompileError} = require('./errors')

const stringIsString = text => {
    if(typeof text !== 'string')
        throw new Error(`The value ${text} is not a string`)
}

const stringExists = text => {
    // Falsy strings: undefined or length = 0
    if(!text)
        throw new Error(`The value ${text} is undefined or empty`)
}

const stringIsLength = (text, target) => {
    try{
        NumberValidator
        .value(text.length)
        .isExisting()
        .isNumber()
        .isExactly(target)
    } catch (err){
        if(err.message.includes('undefined or null') || err.message.includes('not a number'))
            throw new CompileError(`The provided required length ${target}, is not a valid argument`)
        else if(err.message.includes('does not equal'))
            throw new Error(`The value ${text} is not the required length`)
        else
            throw new CompileError('unknown', err.message)
    }
}

const stringMatches = (text, regex) => {
    try{
        const r = new RegExp(regex)
    } catch(err){
        if(err instanceof SyntaxError)
            throw new CompileError(`The regex: ${regex.toString()} is invalid`, err.message)
        else
            throw err
    }

    if(!r.test(text))
        throw new Error(`The value ${text} does not match the provided regex: ${regex.toString()}`)
}

// function chaining: https://medium.com/technofunnel/javascript-function-chaining-8b2fbef76f7f
const NumberValidator = {
    num: undefined,
    value(num){
        this.num = num
        return this
    },
    isExisting(){
        if(this.num === 'undefined' || this.num === null)
            throw new CompileError(`Value is undefined or null`)
        
        return this
    },
    isNumber(){
        if(typeof this.num !== 'number')
            throw new CompileError('Value is not a number')
        
        return this
    },
    isExactly(target){
        if(this.num !== target)
            throw new CompileError(`Value does not equal the required value ${target}`)
        
        return this
    },
    isAtleast(target){
        if(!(this.num >= target))
            throw new CompileError(`Value is not greater than or equal to the required value ${target}`)

        return this
    },
    isAtmost(target){
        if(!(this.num <= target))
            throw new CompileError(`Value is not less than or equal to the required value ${target}`)

        return this
    }
}

module.exports = {
    NumberValidator
}