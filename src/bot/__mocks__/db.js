const { EventEmitter } = require("events")
const stream = new EventEmitter()

module.exports = jest.fn().mockReturnValue({
    put: jest.fn(),
    createReadStream: jest.fn().mockReturnValue(stream),
    del: jest.fn()
})
