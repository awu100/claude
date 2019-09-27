const clearSale = require("./clearSale")

describe("Clear sale from #sales-queue", () => {
    const user = { id: "1234" }
    const salesdb = { del: jest.fn().mockResolvedValue(1) }
    const client = {
        users: { get: jest.fn().mockReturnValue({ username: "bobby" }) }
    }

    const message = {
        mentions: {
            users: null
        },
        channel: {
            name: null
        },
        content: "abc: message",
        delete: jest.fn()
    }

    const emoji = { name: "x" }

    beforeEach(() => {
        jest.clearAllMocks()
        message.mentions.users = new Map([["1234", {}]])
        message.channel.name = "sales-queue"
    })

    test("Should delete sale queue message where mentioned user reacts", () => {
        clearSale({ message, emoji }, user.id, salesdb, client)
        expect(message.delete).toHaveBeenCalled()
    })

    test("Should not delete sale queue message where other user reacts", () => {
        message.mentions.users = new Map([["1111", {}]])
        clearSale({ message }, user.id, salesdb)
        expect(message.delete).not.toHaveBeenCalled()
    })
    test("Should not delete message where in other channel", () => {
        message.channel.name = "session-chat"
        clearSale({ message }, user.id, salesdb)
        expect(message.delete).not.toHaveBeenCalled()
    })
})
