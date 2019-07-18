const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

client.once("ready", () => {
  console.log("Connected to discord");

  client.on("message", message => {
    console.log(`<@${client.user.id}> ${message.content}`);
    if (message.channel.type !== "dm" || message.author.bot) {
      return;
    }

    const user = message.author.username;
    const text = message.content;
    message.channel.send(`Your message was "${text}"`);
  });
});

client.login(process.env.TOKEN);
