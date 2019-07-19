const uptime = require("./uptime");
const message = {
  channel: {
    send: jest.fn()
  }
};

describe("Uptime", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("30 seconds", () => {
    uptime(message, 30);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 30 seconds"
    );
  });

  test("60 seconds", () => {
    uptime(message, 60);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 1 minute"
    );
  });

  test("61 seconds", () => {
    uptime(message, 61);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 1 minute 1 second"
    );
  });

  test("119 seconds", () => {
    uptime(message, 119);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 1 minute 59 seconds"
    );
  });

  test("300 seconds", () => {
    uptime(message, 300);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 5 minutes"
    );
  });

  test("4000 seconds", () => {
    uptime(message, 4000);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 1 hour 6 minutes 40 seconds"
    );
  });
  test("8000 seconds", () => {
    uptime(message, 8000);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 2 hours 13 minutes 20 seconds"
    );
  });
});
