const uptime = require("./uptime");
const message = {
  channel: {
    type: "dm",
    send: jest.fn()
  }
};
const hostname = "banana";

describe("Uptime", () => {
  beforeEach(() => {
    message.channel.type = "dm";
    jest.resetAllMocks();
  });

  test("Singular second", () => {
    uptime(message, 1, hostname);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 1 second on banana"
    );
  });

  test("Plural seconds", () => {
    uptime(message, 30, hostname);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 30 seconds on banana"
    );
  });

  test("Singular minute", () => {
    uptime(message, 60, hostname);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 1 minute on banana"
    );
  });

  test("Plural Minutes", () => {
    uptime(message, 150, hostname);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 2 minutes 30 seconds on banana"
    );
  });

  test("Singular hour", () => {
    uptime(message, 4000, hostname);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 1 hour 6 minutes 40 seconds on banana"
    );
  });

  test("Plural hours", () => {
    uptime(message, 8000, hostname);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 2 hours 13 minutes 20 seconds on banana"
    );
  });

  test("Singular day", () => {
    uptime(message, 100000, hostname);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 1 day 3 hours 46 minutes 40 seconds on banana"
    );
  });

  test("Plural day", () => {
    uptime(message, 200000, hostname);
    expect(message.channel.send).toHaveBeenCalledWith(
      "I've been up for 2 days 7 hours 33 minutes 20 seconds on banana"
    );
  });

  test("No reponse if message is not from dm", () => {
    message.channel.type = "something else";
    uptime(message, 8000, hostname);
    expect(message.channel.send).not.toHaveBeenCalled();
  });
});
