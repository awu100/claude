const db = require("../../db")()

module.exports = ({ message, client }) => {
    const sales = []

    db.createReadStream()
        .on("data", function(data) {
            const payload = JSON.parse(data.value)

            if (!payload.channel_id) {
                console.error("bad data", JSON.stringify(data, null, 2))
                db.del(data.key)
                return
            }

            const channel = client.channels.get(payload.channel_id)

            sales.push(
                JSON.stringify(
                    {
                        [data.key]: {
                            ...payload,
                            time: new Date(payload.ts)
                        }
                    },
                    null,
                    2
                )
            )
        })
        .on("error", function(error) {
            console.error(error)
        })
        .on("end", () => {
            if (sales.length === 0) {
                message.channel.send("sales db empty")
                return
            }

            message.channel.send("`" + sales.join(",\n") + "`")
        })
}
