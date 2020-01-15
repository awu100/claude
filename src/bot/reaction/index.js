const clearSale = require("./clearSale")
const queueGroup = require("./queueGroup")

function reactionAdd(reaction, user) {
  setTimeout(() => {
        clearSale(reaction, user.id)
        queueGroup.add(reaction, user.id)
    }, 500)
}

function reactionRemove(reaction, user) {
  setTimeout(() => {
        queueGroup.remove(reaction, user.id)
    }, 500)
}

module.exports = {add: reactionAdd, remove: reactionRemove}
