module.exports = ({ message }, salesdb) => {
    if (
        message.channel.type !== "dm" ||
        message.author.id !== "325265753773178881"
    ) {
        return
    }

    const sales = []

    salesdb
        .createReadStream()
        .on("data", function(data) {
            sales.push(
                JSON.stringify({ [data.key]: JSON.parse(data.value) }, null, 2)
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

            message.channel.send(sales.join(",\n"))
        })
}
