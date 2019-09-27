const yesNo = { no: "💤", yes: "✅" }
const yesNoEmojis = Object.values(yesNo)

const [FIRST_REMINDER_TIME, NEXT_REMINDER_TIME] = [45, 30]

const salesdb = require("../../db")()
const { logger } = require("../../helpers")

const getSales = () =>
    new Promise((resolve, reject) => {
        const sales = []

        salesdb
            .createReadStream()
            .on("data", ({ key, value }) => {
                sales.push({ message_id: key, ...JSON.parse(value) })
            })
            .on("error", error => reject(error))
            .on("end", () => resolve(sales))
    })

const salesWithMessages = (sales, client) =>
    Promise.all(
        sales.map(sale => {
            const channel = client.channels.get(sale.channel_id)
            return channel
                .fetchMessage(sale.message_id)
                .catch(error => ({ error: error.message }))
                .then(saleMessage => ({ saleMessage, ...sale }))
        })
    )

const timeSince = ts => Math.floor((Date.now().valueOf() - ts) / 1000 / 60)

const sendReminders = (sales, client) =>
    Promise.all(
        sales
            .map(sale => {
                const since = timeSince(sale.ts)
                if (since < FIRST_REMINDER_TIME) {
                    return null
                }

                if (
                    sale.lastReminder &&
                    timeSince(sale.lastReminder) < NEXT_REMINDER_TIME
                ) {
                    return null
                }

                const user = client.users.get(sale.user_id)

                logger.info(
                    `sent reminder to <${user.username}> for <${sale.saleDetail}> at ${since} minutes`
                )

                return user.send(
                    `Is your sale \`${sale.saleDetail}\` complete? It's been in the queue for ${since} minutes.\n` +
                        `React with ${yesNo.yes} if you're done with it, or ${yesNo.no} and I'll ask again later.`
                )
            })
            .filter(Boolean)
    )

const removeDeletedSales = deletedSales =>
    Promise.all(deletedSales.map(sale => salesdb.del(sale.message_id)))

const addReactions = (messages, emojis) => {
    messages.forEach(message => emojis.forEach(emoji => message.react(emoji)))
    return messages
}

const awaitPlayerReaction = (sales, messages, handler) => {
    messages.forEach((message, ndx) => {
        const sale = sales[ndx]
        const filter = (reaction, user) =>
            yesNoEmojis.includes(reaction.emoji.name) &&
            user.id === sale.user_id

        const reactionListener = message.createReactionCollector(filter, {
            time: 4 * 60 * 1000
        })

        reactionListener.on("collect", reaction => {
            handler(sale, reaction.emoji.name)
            reactionListener.stop()
        })
        reactionListener.on("end", reactions => {
            if ([...reactions].length === 0) {
                handler(sale, null)
            }
        })
    })
}

async function reactionHandler(sale, reaction) {
    const { yes, no } = yesNo

    const { ts, user_id, channel_id, saleDetail, ignored: ignoredBefore } = sale

    let ignored = ignoredBefore

    switch (reaction) {
        case yes:
            ignored = false

            await sale.saleMessage
                .delete()
                .then(salesdb.del(sale.saleMessage.id))
            sale.user.send(
                "Ok, I've marked your sale as complete. Please remember to react to your sales in future."
            )
            logger.info(
                `<${sale.user.username}> marked <${
                    sale.saleDetail
                }> as complete at ${timeSince(ts)} minutes`
            )

            break
        case no:
            ignored = false

            sale.user.send(
                "Ok, I'll ask again in a while. Please remember to mark your sales when done or canceled."
            )
            logger.info(
                `<${sale.user.username}> snoozed <${
                    sale.saleDetail
                }> at ${timeSince(ts)} minutes`
            )

            break
        default:
            if (sale.ignored) {
                sale.user.send(
                    "You've ignored me once before, so I have now deleted your sale. Please remember to mark your sales when done or canceled."
                )
                logger.info(
                    `<${sale.user.username}> ignored <${
                        sale.saleDetail
                    }> at ${timeSince(
                        ts
                    )} minutes. sale deleted due to consecutive ignore. `
                )

                await sale.saleMessage
                    .delete()
                    .then(salesdb.del(sale.saleMessage.id))
                return
            } else {
                ignored = true
                sale.user.send(
                    "I will have to delete your sale if you ignore the next reminder. Please don't make me do that. I'm nice really. "
                )
                logger.info(
                    `<${sale.user.username}> ignored <${
                        sale.saleDetail
                    }> at ${timeSince(ts)} minutes. warning given. `
                )
            }
            break
    }

    await salesdb.put(
        sale.saleMessage.id,
        JSON.stringify({
            ts,
            user_id,
            channel_id,
            saleDetail,
            lastReminder: Date.now().valueOf(),
            ignored
        })
    )
}

const chase = async ({ client }) => {
    const sales = await getSales().then(s => salesWithMessages(s, client))

    const currentSales = sales
        .filter(sale => !sale.saleMessage.hasOwnProperty("error"))
        .map(sale => ({
            ...sale,
            user: client.users.get(sale.user_id)
        }))

    Promise.all([
        removeDeletedSales(
            sales.filter(sale => sale.saleMessage.hasOwnProperty("error"))
        ),
        sendReminders(currentSales, client)
            .then(reminders => addReactions(reminders, yesNoEmojis))
            .then(messages =>
                awaitPlayerReaction(currentSales, messages, reactionHandler)
            )
    ])
}

module.exports = {
    _: {
        getSales,
        salesWithMessages,
        removeDeletedSales,
        sendReminders,
        addReactions,
        awaitPlayerReaction
    },
    chase
}
