const uptime = require("./uptime")

function checkUser(command, params) {
    const [{ message }] = params
    const devUserId = process.env["DEV_USER_ID"] || ""

    if (message.author.id !== devUserId) {
        message.channel.send("Unauthorised request")
        return
    }

    command(...params)
}

module.exports = {
    uptime: (...params) => checkUser(uptime, params)
}
