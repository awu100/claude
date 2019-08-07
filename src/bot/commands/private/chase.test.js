const chase = require("./chase")

describe("Check sales queue and chase abandoned sales", () => {
    const channel = {
        fetchMessage: jest.fn()
    }

    const message = {
        delete: jest.fn()
    }

    const client = {
        channels: {
            get: jest.fn()
        }
    }

    const dbdata = {
        key: "123",
        value: JSON.stringify({
            channel_id: 456,
            saleDetail: "2mc"
        })
    }

    const on = (event, callback) => {
        if (event === "data") {
            callback(dbdata)
        }
        return { on }
    }

    const salesdb = {
        createReadStream: () => ({ on }),
        del: jest.fn()
    }

    beforeEach(() => {
        jest.resetAllMocks()
        client.channels.get.mockReturnValue(channel)
        channel.fetchMessage.mockResolvedValue(message)
    })

    // test("Delete sale from db that was deleted from channel", () => {
    //     channel.fetchMessage.mockRejectedValue("some error")
    //     chase({ client }, salesdb)
    //     expect(salesdb.del).toHaveBeenCalledWith(dbdata.key)
    // })
    test.todo("Record in database that we send a reminder to player")
    test.todo("Send a message to ask player if sale is done")
})
