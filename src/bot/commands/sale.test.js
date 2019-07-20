const sale = require("./sale");

let message;

const client = {
  channels: [{ name: "sales-queue", send: jest.fn() }]
};

describe("Sale", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    message = {
      author: "BananaMan",
      channel: {
        name: "session-chat"
      }
    };
  });

  test("posts sale to sales-queue", () => {
    sale({ params: "2mc", message, client });

    expect(client.channels[0].send).toHaveBeenCalledWith("BananaMan: 2mc");
  });

  test("no post because message was in the wrong queue", () => {
    message.channel.name = "preston";
    sale({ params: "2mc", message, client });

    expect(client.channels[0].send).not.toHaveBeenCalled();
  });
});
