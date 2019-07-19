const commands = require("./commands");
const doCommand = require("./doCommand");
const commandSplitter = require("../utils/commandSplitter");

module.exports = (message, client) => {
  const commandString = message.content;
  const command = commandSplitter(commandString);
  if (!command) {
    return;
  }

  setTimeout(() => {
    doCommand(command, commands, message, client);
  }, 500);
};
