const claude = require("./help")
const sale = require("./sale")
const random = require("./random")
const memberlist = require("./memberlist")
const numbers = require("./numbers")
const pic = require("./pic")
const yeet = require("./yeet")

const private = require("./private")

module.exports = {
    claude,
    sale,
    s: sale,
    random,
    r: random,
    memberlist,
    numbers,
    yeet,
    pic,
    ...private
}
