const { Attachment } = require("discord.js")
const { DateTime } = require("luxon")
const fs = require("fs")
const csv = require("csv-stringify/lib/sync")

module.exports = ({ message }) => {
    if (
        !message.channel.name.toLowerCase().startsWith("staff") ||
        message.channel.parent.name.toLowerCase() !== "staff"
    ) {
        return
    }

    const productionDate = DateTime.local().toFormat("yyyy-LL-dd")
    const fileName = `/tmp/${productionDate}-memberlist.csv`

    const devUserId = process.env["DEV_USER_ID"] || ""

    if (message.author.id !== devUserId && fs.existsSync(fileName)) {
        message.channel.send("You can only run this command once per day")
        return
    }

    const users = message.guild.members.map(member => {
        const { id, username, discriminator } = member.user
        const roles = member.roles
            .filter(role => role.name !== "@everyone")
            .map(role => `"${role.name}"`)
            .join(",")

        const joined = member.joinedAt
            ? member.joinedAt.toISOString()
            : undefined

        return {
            id,
            joined,
            username: `${username}#${discriminator}`,
            nickname: member.nickname || undefined,
            roles
        }
    })

    const user_csv = csv(users, { header: true })

    fs.writeFile(fileName, user_csv, err => {
        if (err) {
            console.log(err)
            message.channel.send("error saving the temp file")
            return
        }

        const attachment = new Attachment(fileName)
        message.channel.send(attachment)
    })
}
