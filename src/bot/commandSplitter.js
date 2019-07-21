function commandSplitter(commandString) {
  if (commandString.length < 2 || commandString[0] !== "!") {
    return null;
  }

  const commandStringArray = commandString.substring(1).split(" ");
  const command = commandStringArray[0];
  const [_, ...params] = commandStringArray;

  return {
    command,
    params: params.length > 0 ? params.join(" ") : null
  };
}

module.exports = commandSplitter;
