const clearSale = require("./clearSale")

const level = require("level")
const salesdb = level("database-sales")

module.exports = (reaction, user) => {
    setTimeout(() => {
        clearSale(reaction, user, salesdb)
    }, 500)
}
