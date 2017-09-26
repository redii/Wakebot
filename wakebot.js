const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("message", (message) => {

  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command == "wake") {
      var member = message.mentions.members.first();
      
      if (args[1] > 1 && args[1] < 4) {
        for (var i = 1; i <= args[1]; i++) {
            member.send(".");
            member.send("┌──────────────────────────┐");
            member.send("├────── " + message.author.username + " tried to wake you up ─────┤");
            member.send("└──────────────────────────┘");
            member.send(".");
          }
      } else {
        member.send(".");
        member.send("┌──────────────────────────┐");
        member.send("├────── " + message.author.username + " tried to wake you up ─────┤");
        member.send("└──────────────────────────┘");
        member.send(".");
      }

      console.log(message.author.username + " tried to wake up ###");
  }
});

client.login(config.token);