const os = require("os")
const shortid = require("shortid").generate

const uptime = require("./uptime")
const sale = require("./sale")

const dblist = require("./private/dblist")
const dbclear = require("./private/dbclear")

const salesdb = require("../db")()

module.exports = {
    uptime: ({ message }) =>
        uptime(
            message,
            parseInt(process.uptime()),
            os.hostname(),
            parseInt(os.freemem() / 1024 / 1024)
        ),
    sale: options => sale(options, salesdb, shortid),

    dblist: options => dblist(options, salesdb),
    dbclear: options => dbclear(options, salesdb)
}
