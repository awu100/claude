const claude = require("./help")
const heist = require("./heist")
const ready = require("./ready")
const memberlist = require("./memberlist")
const numbers = require("./numbers")
const pic = require("./pic")
const yeet = require("./yeet")

const private = require("./private")

module.exports = {
    claude,
    heist,
    heist: sale,
    ready,
    r: ready,
    memberlist,
    numbers,
    yeet,
    pic,
    ...private
}
