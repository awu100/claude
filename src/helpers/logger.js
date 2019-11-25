const pino = require("pino")

const logger = pino("./chase.log.json")

module.exports = logger
