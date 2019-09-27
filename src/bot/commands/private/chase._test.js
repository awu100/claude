const { EventEmitter } = require("events")

const {
    _: {
        getSales,
        salesWithMessages,
        removeDeletedSales,
        sendReminders,
        addReactions,
        awaitPlayerReaction,
        reactionHandler
    }
} = require("./chase")

describe("Check sales queue and chase abandoned sales", () => {
    const fakeTime = Date.now().valueOf()
    const timestamp = minutes => fakeTime - minutes * 60 * 1000

    const fakeDb = [
        {
            key: "1",
            value: JSON.stringify({
                channel_id: "9",
                detail: "2mc",
                ts: timestamp(31)
            })
        },
        {
            key: "2",
            value: JSON.stringify({
                channel_id: "8",
                detail: "2mc",
                ts: timestamp(89)
            })
        },
        {
            key: "3",
            value: JSON.stringify({
                channel_id: "7",
                detail: "bunker, 2 cars",
                ts: timestamp(31)
            })
        },
        {
            key: "4",
            value: JSON.stringify({
                channel_id: "6",
                detail: "bunker, 2 cars",
                ts: timestamp(45)
            })
        }
    ]

    let fakeSalesList,
        fakeSalesWithMessages,
        reminderMessages,
        reminderMessagesWithReactionCollector

    const stream = new EventEmitter()

    const salesdb = {
        createReadStream: () => stream,
        del: jest.fn()
    }

    const emojis = { yes: "✅", no: "❌" }

    const reactionCollectors = [new EventEmitter(), new EventEmitter()]
    for (const rc of reactionCollectors) {
        rc.stop = jest.fn()
    }

    const reminderMessage = {
        react: jest.fn().mockResolvedValue("")
    }

    const message = {
        send: jest.fn().mockResolvedValue(reminderMessage)
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    beforeAll(() => {
        fakeSalesList = fakeDb.map(sale => ({
            message_id: sale.key,
            ...JSON.parse(sale.value)
        }))

        fakeSalesWithMessages = fakeSalesList.map((sale, ndx) =>
            ndx === 0
                ? { ...sale, saleMessage: { error: "Unknown Message" } }
                : { ...sale, saleMessage: message }
        )

        reminderMessages = fakeSalesWithMessages
            .filter(sale => !sale.saleMessage.hasOwnProperty("error"))
            .map(() => ({
                reminderMessage
            }))

        reminderMessagesWithReactionCollector = reactionCollectors.map(
            reactionCollector => ({
                ...reminderMessage,
                createReactionCollector: () => reactionCollector
            })
        )
    })

    describe("getSales", () => {
        test("get list of sales", done => {
            getSales(salesdb).then(sales => {
                expect(sales).toEqual(fakeSalesList)
                done()
            })

            fakeDb.forEach((item, ndx) => {
                stream.emit("data", item)
                if (ndx === fakeDb.length - 1) {
                    stream.emit("end")
                }
            })
        })

        test.todo("Deal with some failures")
    })

    describe("salesWithMessages", () => {
        const channel = {
            fetchMessage: jest.fn().mockResolvedValue(message)
        }

        const client = {
            channels: {
                get: jest.fn().mockReturnValue(channel)
            }
        }
        test("get list of sales with messages", done => {
            channel.fetchMessage.mockRejectedValueOnce({
                message: "Unknown Message"
            })
            salesWithMessages(fakeSalesList, client).then(sales => {
                expect(sales).toMatchObject(fakeSalesWithMessages)
                done()
            })
        })

        test.todo("deal with some failures")
    })

    test("Delete sale from db that was deleted from channel", async () => {
        await removeDeletedSales(
            fakeSalesWithMessages.filter(sale =>
                sale.saleMessage.hasOwnProperty("error")
            ),
            salesdb
        )

        expect(salesdb.del).toHaveBeenCalledTimes(1)
        expect(salesdb.del).toHaveBeenCalledWith("1")
    })

    test("Send a message to ask player if sale is done after 45 minutes", async () => {
        const messages = await sendReminders(
            fakeSalesWithMessages.filter(
                sale => !sale.saleMessage.hasOwnProperty("error")
            )
        )

        expect(messages).toHaveLength(2)
        expect(message.send).toHaveBeenCalledTimes(2)
        expect(message.send).toHaveBeenCalledWith(
            `Is your sale \`bunker, 2 cars\` complete? It's been in the queue for 45 minutes.`
        )
        expect(message.send).toHaveBeenCalledWith(
            `Is your sale \`2mc\` complete? It's been in the queue for 89 minutes.`
        )
    })

    test("Add yes/no reactions to messages", async () => {
        expect.assertions(reminderMessagesWithReactionCollector.length * 2)
        await addReactions(
            reminderMessagesWithReactionCollector,
            Object.values(emojis)
        )

        reminderMessagesWithReactionCollector.forEach(rm => {
            expect(rm.react).toHaveBeenCalledWith(emojis.yes)
            expect(rm.react).toHaveBeenCalledWith(emojis.no)
        })
    })

    describe("Listens for player's response for 5 minutes", () => {
        const receiveReaction = jest.fn()

        beforeEach(() => {
            jest.clearAllMocks()
        })

        test("Gets 'No' reaction", () => {
            awaitPlayerReaction(
                reminderMessagesWithReactionCollector,
                receiveReaction
            )
            reactionCollectors[0].emit("collect", {
                emoji: { name: emojis.no }
            })

            expect(receiveReaction).toHaveBeenCalledWith(
                reminderMessages[0].message_id,
                emojis.no
            )
        })

        test("Gets 'Yes' reaction", () => {
            awaitPlayerReaction(
                reminderMessagesWithReactionCollector,
                receiveReaction
            )
            reactionCollectors[1].emit("collect", {
                emoji: { name: emojis.yes }
            })

            expect(receiveReaction).toHaveBeenCalledWith(
                reminderMessages[1].message_id,
                emojis.yes
            )
        })
        test("Handles non-reaction", () => {
            awaitPlayerReaction(
                reminderMessagesWithReactionCollector,
                receiveReaction
            )
            reactionCollectors[0].emit("end", [])

            expect(receiveReaction).toHaveBeenCalledWith(
                reminderMessages[0].message_id,
                null
            )
        })
    })

    test("Delete sales when player reacts that sale is done", () => {
        reactionHandler()
    })
    test.todo("Doesn't delete sale when player reacts that sale is not done")
    test.todo("Doesn't delete sale when player ignores 1st reminder")
    test.todo("Delete salewhen player ignores 2nd reminder")
})
