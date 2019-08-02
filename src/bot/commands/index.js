const os = require("os")

const uptime = require("./uptime")
const sale = require("./sale")

const level = require("level")
const salesdb = level("database-sales")

module.exports = {
    uptime: ({ message }) =>
        uptime(
            message,
            parseInt(process.uptime()),
            os.hostname(),
            parseInt(os.freemem() / 1024 / 1024)
        ),
    sale: options => sale(options, salesdb)
}
