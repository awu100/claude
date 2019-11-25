const sale = require("./sale")
const random = require("./random")
const private = require("./private")

module.exports = {
    sale,
    random,
    ...private
}
