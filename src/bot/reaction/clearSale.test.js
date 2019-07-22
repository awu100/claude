const clearSale = require("./clearSale");

describe("Clear sale from #sales-queue", () => {
  const user = { id: "1234" };

  const message = {
    mentions: {
      users: null
    },
    channel: {
      name: null
    },
    delete: jest.fn()
  };

  beforeEach(() => {
    message.mentions.users = new Map([["1234", {}]]);
    message.channel.name = "sales-queue";
    jest.resetAllMocks();
  });

  test("Should delete sale queue message where mentioned user reacts", () => {
    clearSale({ message }, user);
    expect(message.delete).toHaveBeenCalled();
  });

  test("Should not delete sale queue message where other user reacts", () => {
    message.mentions.users = new Map([["1111", {}]]);
    clearSale({ message }, user);
    expect(message.delete).not.toHaveBeenCalled();
  });
  test("Should not delete message where in other channel", () => {
    message.channel.name = "session-chat";
    clearSale({ message }, user);
    expect(message.delete).not.toHaveBeenCalled();
  });
});
