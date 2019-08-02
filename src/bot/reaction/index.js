const clearSale = require("./clearSale")
const salesdb = require("../db")()

module.exports = (reaction, user) => {
    setTimeout(() => {
        clearSale(reaction, user, salesdb)
    }, 500)
}
