const random = require("./random")

describe("Inform users that a random is among us", () => {
    const message = {
        channel: {
            name: "sessions-chat",
            send: jest.fn()
        }
    }

    const mockEmbed = {
        setDescription: jest.fn(),
        setColor: jest.fn()
    }

    const RichEmbed = jest.fn().mockImplementation(() => mockEmbed)

    beforeEach(() => {
        jest.clearAllMocks()
        message.channel.name = "sessions-chat"
    })

    test("Tell users about a single random", () => {
        random({ message }, RichEmbed)

        expect(message.channel.send).toHaveBeenCalledWith(mockEmbed)
        expect(mockEmbed.setDescription).toHaveBeenCalledWith(
            "@here **Please kick the random!**"
        )
    })
    test("Tell users that there are many randoms and who to kick", () => {
        const params = "barryTheFish"
        random({ params, message }, RichEmbed)

        expect(message.channel.send).toHaveBeenCalledWith(mockEmbed)
        expect(mockEmbed.setDescription).toHaveBeenCalledWith(
            "@here **Please kick `barryTheFish`!\n\nDo __not__ split kicks.**"
        )
    })
    describe("Should not say shit unless message came from #sessions-chat", () => {
        test("for single random", () => {
            message.channel.name = "banana-land"
            random({ message }, RichEmbed)

            expect(message.channel.send).not.toHaveBeenCalled()
            expect(mockEmbed.setDescription).not.toHaveBeenCalled()
        })
        test("for many randoms", () => {
            message.channel.name = "banana-land"
            const params = "barryTheFish"
            random({ params, message }, RichEmbed)

            expect(message.channel.send).not.toHaveBeenCalled()
            expect(mockEmbed.setDescription).not.toHaveBeenCalled()
        })
    })
})
