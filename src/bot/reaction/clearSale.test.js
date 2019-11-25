const clearSale = require("./clearSale")

describe("Clear sale from #sales-queue", () => {
    const user = { id: "1234" }

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

    let message

    beforeEach(() => {
        jest.clearAllMocks()
        message = messageWith()
    })

    test("Should delete sale queue message where mentioned user reacts", () => {
        clearSale({ message }, user.id)
        expect(message.delete).toHaveBeenCalled()
    })

    test("Should not delete sale queue message where other user reacts", () => {
        const message = messageWith({ users: new Map([["1111", {}]]) })

        clearSale({ message }, user.id)
        expect(message.delete).not.toHaveBeenCalled()
    })
    test("Should not delete message where in other channel", () => {
        const message = messageWith({ channel: "sessions-chat" })
        clearSale({ message }, user.id)
        expect(message.delete).not.toHaveBeenCalled()
    })
})
