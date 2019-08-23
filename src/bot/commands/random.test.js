const random = require("./random")

describe("Inform users that a random is among us", () => {
    const message = {
        channel: {
            name: "sessions-chat",
            send: jest.fn()
        }
    }

    beforeEach(() => {
        jest.clearAllMocks()
        message.channel.name = "sessions-chat"
    })

    test("Tell users about a single random", () => {
        random({ message })

        expect(message.channel.send).toHaveBeenCalledWith(
            ":rotating_light: @here **Please kick the random!** :rotating_light:"
        )
    })
    test("Tell users that there are many randoms and who to kick", () => {
        const params = "barryTheFish"
        random({ params, message })

        expect(message.channel.send).toHaveBeenCalledWith(
            ":rotating_light: @here **Please kick `barryTheFish`!\n\nDo __not__ split kicks.** :rotating_light:"
        )
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
