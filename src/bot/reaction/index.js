const clearSale = require("./clearSale")

function reactionAdd(reaction, user) {
    setTimeout(() => {
        clearSale(reaction, user)
    }, 500)
}

module.exports = { add: reactionAdd }
