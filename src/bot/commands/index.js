const os = require("os");

module.exports = {
  uptime: ({ message }) =>
    require("./uptime")(message, parseInt(process.uptime()), os.hostname())
};
