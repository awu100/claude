const ready = require("./ready")

describe("Inform heist is ready", () => {
    const message = {
        channel: {
            name: "random-bullshit-chat",
            send: jest.fn().mockResolvedValue({ react: jest.fn() })
        }
    }

    beforeEach(() => {
        jest.clearAllMocks()
        message.channel.name = "random-bullshit-chat"
    })

    test("Tell users about a single random", () => {
        random({ message })

        expect(message.channel.send).toHaveBeenCalledWith(
            "@here **MY HEIST IS READY!**"
        )
    })
    test("Tell users that there are many randoms and who to kick", () => {
        const params = "barryTheFish"
        random({ params, message })

        expect(message.channel.send).toHaveBeenCalledWith(
            "@here **MY `barryTheFish` HEIST IS READY!**"
        )
    })

    test("Tells uses about a random in another channel containing 'sessions-chat'", () => {
        message.channel.name = "something-sessions-chat-banana"
        random({ message })

        expect(message.channel.send).toHaveBeenCalled()
    })
    describe("Should not say shit unless message came from #sessions-chat", () => {
        test("for single random", () => {
            message.channel.name = "banana-land"
            random({ message })

            expect(message.channel.send).not.toHaveBeenCalled()
        })
        test("for many randoms", () => {
            message.channel.name = "banana-land"
            const params = "barryTheFish"
            random({ params, message })

            expect(message.channel.send).not.toHaveBeenCalled()
        })
    })
})
