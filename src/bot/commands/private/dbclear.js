module.exports = ({ message }, salesdb) => {
    if (
        message.channel.type !== "dm" ||
        message.author.id !== "325265753773178881"
    ) {
        return
    }

    const salesToDelete = []

    salesdb
        .createReadStream()
        .on("data", function(data) {
            salesToDelete.push({ type: "del", key: data.key })
        })
        .on("error", function(error) {
            console.error(error)
        })
        .on("end", () => {
            salesdb
                .batch(salesToDelete)
                .then(_ok => {
                    message.channel.send(
                        `Deleted ${salesToDelete.length} sales`
                    )
                })
                .catch(console.error)
        })
}
