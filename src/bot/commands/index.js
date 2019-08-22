const os = require("os")
const { RichEmbed } = require("discord.js")

const uptime = require("./uptime")
const sale = require("./sale")
const random = require("./random")

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
    sale: options => sale(options, salesdb),

    dblist: options => dblist(options, salesdb),
    dbclear: options => dbclear(options, salesdb),
    random: options => random(options, RichEmbed)
}
