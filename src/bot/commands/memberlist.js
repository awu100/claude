const { Attachment } = require("discord.js")
const { DateTime } = require("luxon")
const fs = require("fs")

module.exports = ({ message }) => {
    if (
        !message.channel.name.toLowerCase().startsWith("staff") ||
        message.channel.parent.name.toLowerCase() !== "staff"
    ) {
        return
    }

    const productionDate = DateTime.local().toFormat("yyyy-LL-dd")
    const fileName = `/tmp/${productionDate}-memberlist.json`

    const devUserId = process.env["DEV_USER_ID"] || ""

    if (message.author.id !== devUserId && fs.existsSync(fileName)) {
        message.channel.send("You can only run this command once per day")
        return
    }

    const users = message.guild.members.map(member => {
        const { id, username, discriminator } = member.user
        const roles = member.roles
            .map(role => `"${role.name}"`)
            .filter(role => role !== "@everyone")
            .join(",")

        return {
            id,
            joined: member.joinedAt.toISOString(),
            username: `${username}#${discriminator}`,
            nickname: member.nickname || undefined,
            roles
        }
    })

    fs.writeFile(fileName, JSON.stringify(users), err => {
        if (err) {
            console.log(err)
            message.channel.send("error saving the temp file")
            return
        }

        const attachment = new Attachment(fileName)
        message.channel.send(attachment)
    })
}
