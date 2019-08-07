const dblist = require("./dblist")

describe("List Sales DB Records", () => {
    const on = jest.fn()

    const salesdb = {
        createReadStream: jest.fn()
    }

    const message = {
        channel: {
            type: "dm",
            send: jest.fn()
        }
    }

    beforeEach(() => {
        jest.resetAllMocks()
        on.mockImplementation((event, cb) => {
            if (event === "data") {
                cb({ key: "123", value: '{ "p": "abc" }' })
            }
            return { on }
        })
        salesdb.createReadStream.mockReturnValue({ on })
    })

    test("list records since we are me", () => {
        dblist({ message }, salesdb)
        expect(salesdb.createReadStream).toHaveBeenCalled()
    })

    test("records to not be listed cos it's not a dm", () => {
        dblist(
            { message: { ...message, channel: { type: "something" } } },
            salesdb
        )
        expect(salesdb.createReadStream).not.toHaveBeenCalled()
    })
})
