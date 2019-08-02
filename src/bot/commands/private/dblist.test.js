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
        },
        author: {
            id: "325265753773178881"
        }
    }

    beforeEach(() => {
        jest.resetAllMocks()
        on.mockImplementation((_string, cb) => {
            cb({ key: "123", value: '{ "p": "abc" }' })
            return { on }
        })
        salesdb.createReadStream.mockReturnValue({ on })
    })

    test("list records since we are me", () => {
        dblist({ message }, salesdb)
        expect(salesdb.createReadStream).toHaveBeenCalled()
    })

    test("records to not be listed cos we're not me", () => {
        dblist({ message: { ...message, author: { id: "123" } } }, salesdb)
        expect(salesdb.createReadStream).not.toHaveBeenCalled()
    })
})
