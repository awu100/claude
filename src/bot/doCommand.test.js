const doCommand = require("./doCommand");

const commands = {
  valid: jest.fn()
};

const message = {
  channel: {
    send: jest.fn()
  }
};

const client = jest.fn();

describe("Command pick and execution", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Runs valid command", () => {
    doCommand(
      { command: "valid", params: "params" },
      commands,
      message,
      client
    );
    expect(commands.valid).toHaveBeenCalledWith({
      params: "params",
      message,
      client
    });
  });

  test("Does nothing for invalid command", () => {
    doCommand(
      { command: "invalid", params: "params" },
      commands,
      message,
      client
    );
    expect(commands.valid).not.toHaveBeenCalled();
  });

  test("Does nothing for empty command - safety only", () => {
    doCommand({}, commands, message, client);
    expect(commands.valid).not.toHaveBeenCalled();
  });
});
