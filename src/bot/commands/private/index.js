const dblist = require("./dblist")
const dbclear = require("./dbclear")
const { chase } = require("./chase")

function checkUser(command, params) {
    const [{ message }] = params

    if (message.author.username !== "_dotSpace") {
        return
    }

    command(...params)
}

module.exports = {
    dblist: (...params) => checkUser(dblist, params),
    chase: (...params) => checkUser(chase, params),
    dbclear: (...params) => checkUser(dbclear, params)
}
