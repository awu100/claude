const sale = require("./sale")

describe("Sale", () => {
    const shortid = jest.fn().mockReturnValue("123")
    const salesdb = {
        put: jest.fn(() => Promise.resolve(""))
    }

    const client = {
        channels: [
            { name: "sales-queue", parent: "XB", send: jest.fn() },
            { name: "sales-queue", parent: "PS", send: jest.fn() }
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

    let message

    beforeEach(() => {
        jest.resetAllMocks()
        message = messageWith()
    })

    test("posts sale to sales-queue", () => {
        sale({ params: "2mc", message, client }, salesdb, shortid)

        expect(client.channels[1].send).toHaveBeenCalledWith("BananaMan: 2mc")
        expect(client.channels[0].send).not.toHaveBeenCalled()
    })

    test("no post because message was in the wrong queue", () => {
        message = messageWith({ name: "something" })
        sale({ params: "2mc", message, client }, salesdb, shortid)

        expect(client.channels[1].send).not.toHaveBeenCalled()
        expect(client.channels[0].send).not.toHaveBeenCalled()
    })

    test("no post because no parameters", () => {
        sale({ params: null, message, client }, salesdb, shortid)

        expect(client.channels[1].send).not.toHaveBeenCalled()
        expect(client.channels[0].send).not.toHaveBeenCalled()
    })

    test("no post because can't find saleQueue in matching category", () => {
        message = messageWith({ parent: "something" })
        sale({ params: "2mc", message, client }, salesdb, shortid)

        expect(client.channels[1].send).not.toHaveBeenCalled()
        expect(client.channels[0].send).not.toHaveBeenCalled()
    })
})
