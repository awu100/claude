const commandSplitter = require("./commandSplitter");

describe("Command Splitter", () => {
  test("Command with no parameters", () => {
    const command = "!uptime";

    expect(commandSplitter(command)).toMatchObject({
      command: "uptime",
      params: ""
    });
  });

  test("Command and 1 word parameter string", () => {
    const command = "!sale 2mc";

    expect(commandSplitter(command)).toMatchObject({
      command: "sale",
      params: "2mc"
    });
  });

  test("Command name and multi word parameter string", () => {
    const command = "!sale 3mc and bunker";

    expect(commandSplitter(command)).toMatchObject({
      command: "sale",
      params: "3mc and bunker"
    });
  });

  test("not a command", () => {
    const command = "some other string";
    expect(commandSplitter(command)).toBeNull();
  });

  test("only !", () => {
    const command = "!";
    expect(commandSplitter(command)).toBeNull();
  });
});
