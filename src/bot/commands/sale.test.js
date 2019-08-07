const sale = require("./sale")

describe("Sale", () => {
    const fakeTime = Date.now().valueOf()
    Date = {
        now: () => ({
            valueOf: jest.fn().mockReturnValue(fakeTime)
        })
    }

    const salesdb = {
        put: jest.fn()
    }

    let message

    const client = {
        channels: [
            {
                name: "sales-queue",
                parent: "XB",
                send: jest.fn()
            },
            {
                name: "sales-queue",
                parent: "PS",
                send: jest.fn()
            }
        ]
    }

    function messageWith({ name, parent } = {}) {
        return {
            author: "BananaMan",
            channel: {
                name: name || "sessions-chat",
                parent: parent || "PS"
            }
        }
    }

    const fakeSalesMessage = {
        id: "123",
        channel: { id: "987" }
    }

    beforeEach(() => {
        jest.resetAllMocks()
        message = messageWith()

        client.channels[0].send.mockResolvedValue(fakeSalesMessage)
        client.channels[1].send.mockResolvedValue(fakeSalesMessage)
    })

    test("posts sale to sales-queue", async () => {
        await sale({ params: "2mc", message, client }, salesdb)
        expect(client.channels[1].send).toHaveBeenCalledWith("BananaMan: `2mc`")
        expect(client.channels[0].send).not.toHaveBeenCalled()

        expect(salesdb.put).toHaveBeenCalledWith(
            fakeSalesMessage.id,
            JSON.stringify({
                ts: fakeTime,
                channel_id: fakeSalesMessage.channel.id
            })
        )
    })

    test("no post because message was in the wrong queue", () => {
        message = messageWith({ name: "something" })
        sale({ params: "2mc", message, client }, salesdb)

        expect(client.channels[1].send).not.toHaveBeenCalled()
        expect(client.channels[0].send).not.toHaveBeenCalled()
        expect(salesdb.put).not.toHaveBeenCalled()
    })

    test("no post because no parameters", () => {
        sale({ params: null, message, client }, salesdb)

        expect(client.channels[1].send).not.toHaveBeenCalled()
        expect(client.channels[0].send).not.toHaveBeenCalled()
        expect(salesdb.put).not.toHaveBeenCalled()
    })

    test("no post because can't find saleQueue in matching category", () => {
        message = messageWith({ parent: "something" })
        sale({ params: "2mc", message, client }, salesdb)

        expect(client.channels[1].send).not.toHaveBeenCalled()
        expect(client.channels[0].send).not.toHaveBeenCalled()
        expect(salesdb.put).not.toHaveBeenCalled()
    })
})
