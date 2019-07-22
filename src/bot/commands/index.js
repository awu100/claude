const os = require("os");

const uptime = require("./uptime");
const sale = require("./sale");

module.exports = {
  uptime: ({ message }) =>
    uptime(message, parseInt(process.uptime()), os.hostname()),
  sale
};
