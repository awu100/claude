const uptime = require("./uptime")

jest.mock("os", () => ({
    freemem: jest.fn(),
    hostname: jest.fn()
}))

const os = require("os")

describe("Uptime", () => {
    const messageWith = type => ({
        channel: {
            type: type || "dm",
            send: jest.fn()
        }
    })

    let message

    process.uptime = jest.fn()

    os.freemem.mockReturnValue(1024 * 1024 * 1024)
    os.hostname.mockReturnValue("banana")

    beforeEach(() => {
        message = messageWith()
        jest.clearAllMocks()
    })

    test("Singular second", () => {
        process.uptime.mockReturnValue(1)
        uptime({ message })
        expect(message.channel.send).toHaveBeenCalledWith(
            `I've been up for 1 second on banana. Free memory is 1024MiB.`
        )
    })

    test("Plural seconds", () => {
        process.uptime.mockReturnValue(30)
        uptime({ message })
        expect(message.channel.send).toHaveBeenCalledWith(
            `I've been up for 30 seconds on banana. Free memory is 1024MiB.`
        )
    })

    test("Singular minute", () => {
        process.uptime.mockReturnValue(60)
        uptime({ message })
        expect(message.channel.send).toHaveBeenCalledWith(
            `I've been up for 1 minute on banana. Free memory is 1024MiB.`
        )
    })

    test("Plural Minutes", () => {
        process.uptime.mockReturnValue(150)
        uptime({ message })
        expect(message.channel.send).toHaveBeenCalledWith(
            `I've been up for 2 minutes 30 seconds on banana. Free memory is 1024MiB.`
        )
    })

    test("Singular hour", () => {
        process.uptime.mockReturnValue(4000)
        uptime({ message })
        expect(message.channel.send).toHaveBeenCalledWith(
            `I've been up for 1 hour 6 minutes 40 seconds on banana. Free memory is 1024MiB.`
        )
    })

    test("Plural hours", () => {
        process.uptime.mockReturnValue(8000)
        uptime({ message })
        expect(message.channel.send).toHaveBeenCalledWith(
            `I've been up for 2 hours 13 minutes 20 seconds on banana. Free memory is 1024MiB.`
        )
    })

    test("Singular day", () => {
        process.uptime.mockReturnValue(100000)
        uptime({ message })
        expect(message.channel.send).toHaveBeenCalledWith(
            `I've been up for 1 day 3 hours 46 minutes 40 seconds on banana. Free memory is 1024MiB.`
        )
    })

    test("Plural day", () => {
        process.uptime.mockReturnValue(200000)
        uptime({ message })
        expect(message.channel.send).toHaveBeenCalledWith(
            `I've been up for 2 days 7 hours 33 minutes 20 seconds on banana. Free memory is 1024MiB.`
        )
    })

    test("No reponse if message is not from dm", () => {
        const message = messageWith("something else")
        uptime({ message })
        expect(message.channel.send).not.toHaveBeenCalled()
    })
})
