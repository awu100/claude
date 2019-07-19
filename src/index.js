const Discord = require("discord.js");
const client = new Discord.Client();
const bot = require("./bot");
require("dotenv").config();

client.once("ready", () => {
  console.log("Connected to discord");

  client.on("message", message => {
    if (message.channel.type !== "dm" || message.author.bot) {
      return;
    }

    bot(message, client);
  });
});

client.login(process.env.TOKEN);
