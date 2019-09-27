const dblist = require("./dblist")
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

    test("list records", () => {
        dblist({ message }, salesdb)
        expect(salesdb.createReadStream).toHaveBeenCalled()
    })
})
