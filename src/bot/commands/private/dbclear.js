const db = require("../../db")()

module.exports = ({ message }) => {
    const salesToDelete = []

    db.createReadStream()
        .on("data", function(data) {
            salesToDelete.push({ type: "del", key: data.key })
        })
        .on("error", console.error)
        .on("end", () => {
            db.batch(salesToDelete)
                .then(
                    message.channel.send(
                        `Deleted ${salesToDelete.length} sales from DB`
                    )
                )
                .catch(console.error)
        })
}
