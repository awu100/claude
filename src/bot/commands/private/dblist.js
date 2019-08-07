module.exports = ({ message, client }, salesdb) => {
    if (message.channel.type !== "dm") {
        return
    }

    const sales = []

    salesdb
        .createReadStream()
        .on("data", function(data) {
            const payload = JSON.parse(data.value)

            if (!payload.channel_id) {
                return
            }

            const channel = client.channels.get(payload.channel_id)

            channel
                .fetchMessage(data.key)
                .then(message => {})
                .catch(error => {
                    console.error(data.key, error)
                })

            sales.push(payload)
        })
        .on("error", function(error) {
            console.error(error)
        })
        .on("end", () => {
            if (sales.length === 0) {
                message.channel.send("sales db empty")
                return
            }

            message.channel.send(sales.map(sale => {}).join(",\n"))
        })
}
