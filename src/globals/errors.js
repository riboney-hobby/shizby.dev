class PropertyValidationError extends Error {
    constructor(prop, invalidReason = 'unknown'){
        super(`${prop} is invalid\nReason: ${invalidReason}`)
        this.name = "PropertyValidationError"
    }
}

class CompileError extends Error {
    constructor(reason, errMessage="None"){
        super(`Reason: ${reason}\nJS Error message: ${errMessage}`)
        this.name = "CompileError"
    }
}

module.exports = {
    PropertyValidationError,
    CompileError
}