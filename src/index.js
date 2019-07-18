const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

client.once("ready", () => {
  console.log("Connected to discord");
  const loadTime = Date.now();

  client.on("message", message => {
    // console.log(`<@${client.user.id}> ${message.content}`);
    if (message.channel.type !== "dm" || message.author.bot) {
      return;
    }

    // const user = message.author.username;
    const text = message.content;
    const breakdown = text.split(" ");

    const command = breakdown.length > 1 ? breakdown[0] : text;

    switch (command) {
      case "!uptime":
        const seconds = (Date.now() - loadTime) / 1000;
        const hours = seconds / 3600;

        if (seconds < 3600) {
          const minutes = parseInt(seconds / 60);
          const secs = parseInt(seconds - minutes * 60);
          message.channel.send(
            `I've been up for ${minutes} minutes and ${secs} seconds.`
          );
        } else {
          message.channel.send(`I've been up for ${hours} hours.`);
        }
        break;

      default:
        break;
    }
  });
});

client.login(process.env.TOKEN);
