module.exports = {
  uptime: ({ message }) =>
    require("./uptime")(message, parseInt(process.uptime()))
};
