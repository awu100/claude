const sale = require("./sale")
const random = require("./random")
const memberlist = require("./memberlist")

const private = require("./private")

module.exports = {
    sale,
    s: sale,
    random,
    r: random,
    memberlist,
    ...private
}
