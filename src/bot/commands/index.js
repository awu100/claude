const sale = require("./sale")
const random = require("./random")
const memberlist = require("./memberlist")
const numbers = require("./numbers")
const pic = require("./pic")

const private = require("./private")

module.exports = {
    sale,
    s: sale,
    random,
    r: random,
    memberlist,
    numbers,
    pic,
    ...private
}
