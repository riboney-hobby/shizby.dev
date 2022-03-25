const {NumberValidator} = require('../../../src/globals/validators')

describe('Given a valid number value, NumberValidator does not throw any errors when using', () => {
    describe('isExisting(): ', () => {
        test.each([
            1, 0, -1
        ])('#%# - num: %i', (num) => {
            NumberValidator
            .value(num)
            .isExisting()
        })
    })

    describe('isNumber(): ', () => {
        test.each([
            1, 0, -1
        ])('#%# - num: %i', (num) => {
            NumberValidator
            .value(num)
            .isExisting()
            .isNumber()
        })
    })

    describe('isExactly(): ', () => {
        test.each([
            1, 0, -1
        ])('#%# - num & target: %i', (num) => {
            NumberValidator
            .value(num)
            .isExisting()
            .isNumber()
            .isExactly(num)
        })
    })

    describe('isAtleast(): ', () => {
        test.each([
            [5, 1],
            [0, -1],
            [-1, -5],
            [1,1],
            [0,0],
            [-1,-1]
        ])('#%# - target: %i\tnum: %i', (num, target) => {
            NumberValidator
            .value(num)
            .isExisting()
            .isNumber()
            .isAtleast(target)
        })
    })

    describe('isAtmost(): ', () => {
        test.each([
            [1, 5],
            [-1, 0],
            [-5, -1],
            [1,1],
            [0,0],
            [-1,-1]
        ])('#%# - target: %i\tnum: %i', (num, target) => {
            NumberValidator
            .value(num)
            .isExisting()
            .isNumber()
            .isAtmost(target)
        })
    })
})