const clearSale = require("./clearSale")

describe("Clear sale from #sales-queue", () => {
    const user = { id: "1234" }
    const emoji = { name: "" }

    const messageWith = ({
        channel = "sales-queue",
        users = new Map([["1234", {}]])
    } = {}) => ({
        mentions: {
            users
        },
        channel: {
            name: channel
        },
        delete: jest.fn()
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("Should delete sale queue message where mentioned user reacts", () => {
        const message = messageWith()
        clearSale({ emoji, message }, user)
        expect(message.delete).toHaveBeenCalled()
    })

    test("Should not delete sale queue message where other user reacts", () => {
        const message = messageWith({ users: new Map([["1111", {}]]) })

        clearSale({ emoji, message }, user)
        expect(message.delete).not.toHaveBeenCalled()
    })
    test("Should not delete message where in other channel", () => {
        const message = messageWith({ channel: "sessions-chat" })
        clearSale({ emoji, message }, user)
        expect(message.delete).not.toHaveBeenCalled()
    })
})
