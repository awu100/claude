const clearSale = require("./clearSale");

module.exports = (reaction, user) => {
  setTimeout(() => {
    clearSale(reaction, user);
  }, 500);
};
