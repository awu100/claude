const clearSale = require("./clearSale")
const salesdb = require("../db")()

module.exports = (reaction, user, client) => {
    setTimeout(() => {
        clearSale(reaction, user.id, salesdb, client)
    }, 500)
}
