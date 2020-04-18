const sale = require("./sale")

describe("Sale", () => {
    const fakeTime = Date.now().valueOf()
    Date = {
        now: () => ({
            valueOf: jest.fn().mockReturnValue(fakeTime)
        })
    }

    const fakeSalesMessage = {
        id: "123",
        channel: { id: "987" },
        react: jest.fn()
    }

    const client = {
        channels: [
            {
                name: "sales-queue",
                parent: "XB",
                send: jest.fn().mockResolvedValue(fakeSalesMessage)
            },
            {
                name: "sales-queue",
                parent: "PS",
                send: jest.fn().mockResolvedValue(fakeSalesMessage)
            }
        ]
    }

    function messageWith({ name = "sessions-chat", parent = "PS" } = {}) {
        return {
            author: "BananaMan",
            channel: { name, parent }
        }
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("posts sale to sales-queue", async () => {
        await sale({ params: "2mc", message: messageWith(), client })
        expect(client.channels[1].send).toHaveBeenCalledWith("BananaMan: `2mc`")
        expect(client.channels[0].send).not.toHaveBeenCalled()
        expect(fakeSalesMessage.react).toHaveBeenCalledWith("💰")
    })

    test("post sale from channel matching *sessions-chat*", async () => {
        await sale({
            params: "2mc",
            message: messageWith({ name: "something-sessions-chat-another" }),
            client
        })

        expect(client.channels[1].send).toHaveBeenCalledWith("BananaMan: `2mc`")
        expect(client.channels[0].send).not.toHaveBeenCalled()
        expect(fakeSalesMessage.react).toHaveBeenCalledWith("💰")
    })

    test("no post because message was in the wrong queue", () => {
        sale({
            params: "2mc",
            message: messageWith({ name: "something" }),
            client
        })

        expect(client.channels[1].send).not.toHaveBeenCalled()
        expect(client.channels[0].send).not.toHaveBeenCalled()
    })

    test("no post because no parameters", () => {
        sale({ params: null, message: messageWith(), client })

        expect(client.channels[1].send).not.toHaveBeenCalled()
        expect(client.channels[0].send).not.toHaveBeenCalled()
    })

    test("no post because can't find saleQueue in matching category", () => {
        message = messageWith({ parent: "something" })
        sale({ params: "2mc", message, client })

        expect(client.channels[1].send).not.toHaveBeenCalled()
        expect(client.channels[0].send).not.toHaveBeenCalled()
    })

    test.todo("No post because you've already got a sale in the queue")
})
