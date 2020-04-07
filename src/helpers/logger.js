const pino = require("pino")

const logger = pino("./debug.log.json")

module.exports = logger
