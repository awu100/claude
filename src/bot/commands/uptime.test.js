const uptime = require("./uptime");
const message = {
  channel: {
    send: jest.fn()
  }
};
const hostname = "banana";

describe("Uptime", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("30 seconds", () => {
    uptime(message, 30, hostname);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 30 seconds on banana"
    );
  });

  test("60 seconds", () => {
    uptime(message, 60, hostname);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 1 minute on banana"
    );
  });

  test("61 seconds", () => {
    uptime(message, 61, hostname);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 1 minute 1 second on banana"
    );
  });

  test("119 seconds", () => {
    uptime(message, 119, hostname);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 1 minute 59 seconds on banana"
    );
  });

  test("300 seconds", () => {
    uptime(message, 300, hostname);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 5 minutes on banana"
    );
  });

  test("4000 seconds", () => {
    uptime(message, 4000, hostname);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 1 hour 6 minutes 40 seconds on banana"
    );
  });
  test("8000 seconds", () => {
    uptime(message, 8000, hostname);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 2 hours 13 minutes 20 seconds on banana"
    );
  });
});
