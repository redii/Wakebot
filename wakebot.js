// Setting up some const for the program
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

// For Discord.js Errorhandling
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

/ Eventhandler for incoming messages
client.on("message", (message) => {

  // If the message starts with right prefix...
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  
  // Create command variable and args array for easy use
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // If command is wake do...
  if (command == "wake") {
      var mentioned = message.mentions.members.first();
     
      // Some if querys for second argument
      // For a number between 1 and 3
      if (args[1] >= 1 && args[1] < 4) {
        for (var i = 1; i <= args[1]; i++) {
            mentioned.send("."); mentioned.send("."); mentioned.send("."); mentioned.send(".");
            //mentioned.deleteDM();
            mentioned.send(message.author.username + " tried to wake you up");
          }
          message.reply(mentioned.user.username + " wurde angestupst.");
      // If there is not second argument given
      } else if (args[1] == undefined){
        mentioned.send("."); mentioned.send("."); mentioned.send("."); mentioned.send(".");
        //mentioned.deleteDM();
        mentioned.send(message.author.username + " tried to wake you up");
        message.reply(mentioned.user.username + " wurde angestupst.");
      // If something bad was appended...
      } else {
        message.reply("Your second Argument is invalid. Enter a number between 1 and 3.");
      }

      // Write log entry for every poke the bot does
      fs.appendFile('logs.txt', "\n" + message.author.username + " tried to wake up " + mentioned.user.username, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

      // Console log for live output
      console.log(message.author.username + " tried to wake up " + mentioned.user.username + " at " + Date.now());
  }
});

// Bot login using the bots token
client.login(config.token);