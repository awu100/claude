function commandSplitter(commandString) {
  if (commandString.length < 2 || commandString[0] !== "!") {
    return null;
  }

  const commandStringArray = commandString
    .substring(1)
    .trim()
    .split(" ");
  const command = commandStringArray[0];
  let [_, ...params] = commandStringArray;

  return {
    command,
    params: params.length > 0 ? params.join(" ").trim() : null
  };
}

module.exports = commandSplitter;
