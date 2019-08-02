const level = require("level")
let salesdb = null

module.exports = function() {
    if (salesdb) {
        return salesdb
    }

    salesdb = level("database-sales")
    return salesdb
}
