function clearSale({ message }, user) {
  if (message.channel.name !== "sales-queue") {
    return;
  }

  if (!message.mentions.users.has(user.id)) {
    return;
  }

  message.delete();
}

module.exports = clearSale;
