const os = require("os")

const uptime = require("./uptime")
const sale = require("./sale")
const random = require("./random")

const { dblist, chase, dbclear } = require("./private")

module.exports = {
    uptime: ({ message }) =>
        uptime(
            message,
            parseInt(process.uptime()),
            os.hostname(),
            parseInt(os.freemem() / 1024 / 1024)
        ),
    sale,
    dblist,
    dbclear,
    random,
    chase
}
