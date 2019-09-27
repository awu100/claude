const dbclear = require("./dbclear")
const salesdb = require("../../db")()

jest.mock("../../db")

describe("List Sales DB Records", () => {
    const message = {
        channel: {
            type: "dm",
            send: jest.fn()
        }
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("list records since we are me", () => {
        dbclear({ message })
        expect(salesdb.createReadStream).toHaveBeenCalled()
    })
})
