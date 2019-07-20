module.exports = ({ params, message, client }) => {
  if (message.channel.name !== "session-chat") {
    return;
  }

  const salesQueue = client.channels.find(
    channel => channel.name === "sales-queue"
  );

  salesQueue.send(`${message.author}: ${params}`);
};
