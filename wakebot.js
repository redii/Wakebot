const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("message", (message) => {

  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command == "wake") {
      var mentioned = message.mentions.members.first();
      
      if (args[1] >= 1 && args[1] < 4) {
        for (var i = 1; i <= args[1]; i++) {
            mentioned.send(".");
            mentioned.send("┌──────────────────────────┐");
            mentioned.send("├─ " + message.author.username + " tried to wake you up");
            mentioned.send("└──────────────────────────┘");
            mentioned.send(".");
          }
          message.reply(mentioned.user.username + " wurde angestupst.");
      } else if (args[1] == undefined){
        mentioned.send(".");
        mentioned.send("┌──────────────────────────┐");
        mentioned.send("├─ " + message.author.username + " tried to wake you up");
        mentioned.send("└──────────────────────────┘");
        mentioned.send(".");
        message.reply(mentioned.user.username + " wurde angestupst.");
      } else {
        message.reply("Your second Argument is invalid. Enter a number between 1 and 3.");
      }

      fs.appendFile('logs.txt', "\n" + message.author.username + " tried to wake up " + mentioned.user.username, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      console.log(message.author.username + " tried to wake up " + mentioned.user.username);
  }
});

client.login(config.token);