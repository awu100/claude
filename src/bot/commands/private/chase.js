module.exports = function({ client }, salesdb) {
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
                    //message probably deleted
                    salesdb.del(data.key)

                    console.error({ banana: error })
                })
        })
        .on("error", console.error)
}
