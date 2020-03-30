const fetch = require("node-fetch")
const { Attachment } = require("discord.js")
const fs = require("fs")
const csv = require("csv-stringify/lib/sync")

module.exports = async ({ message, params }) => {
    const res = await fetch(
        `http://localhost:3001/api/friends/${params}`
    ).then(res => res.json())

    const friends_csv = csv(
        res.friends.map(friends => ({ friends })),
        {
            header: true
        }
    )

    const fileName = `/tmp/${params}-friendslist.csv`

    fs.writeFile(fileName, friends_csv, err => {
        if (err) {
            console.log(err)
            message.channel.send("error saving the temp file")
            return
        }

        const attachment = new Attachment(fileName)
        message.channel.send(attachment)
    })
}
