const plural = number => (number > 1 ? "s" : "");

module.exports = (message, uptime) => {
  const hours = parseInt(uptime / 3600);
  const minutes = parseInt((uptime - hours * 3600) / 60);
  const seconds = uptime - (hours * 3600 + minutes * 60);

  let uptimeString = "I've been up for";
  if (hours > 0) {
    uptimeString += ` ${hours} hour${plural(hours)}`;
  }

  if (minutes > 0) {
    uptimeString += ` ${minutes} minute${plural(minutes)}`;
  }

  if (seconds > 0) {
    uptimeString += ` ${seconds} second${plural(seconds)}`;
  }

  message.channel.send(uptimeString);
};
