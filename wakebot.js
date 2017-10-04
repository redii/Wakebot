// Setting up some const for the program
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

// For Discord.js Errorhandling
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

// Eventhandler for ready status
client.on('ready', () => {
  console.log("\n[bot] [" + Date.now() + "] The bots status is set to ready.");
  client.user.setGame('!help | v0.1');

  fs.appendFile('logs.txt', "\n\n[bot] [" + Date.now() + "] The bots status is set to ready.", function (err) {
    if (err) throw err;
  });
})

// Eventhandler for incoming messages
client.on("message", (message) => {

  // If the message doesnt start with right prefix return
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  // Create command variable and args array for easy use
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // If command equals help do...
  if (command == "help") {
    message.channel.send("Please type in !wake @xyz#1234 <1-3> to use the bot properly.");
  }

  // If command equals wake do...
  if (command == "wake") {
      var mentioned = message.mentions.members.first();
     
      // Some if querys for second argument
      // For a number between 1 and 3
      if (args[1] >= 1 && args[1] < 4) {
        for (var i = 1; i <= args[1]; i++) {
            mentioned.send("."); mentioned.send("."); mentioned.send("."); mentioned.send(".");
            //message.delete(1);
            mentioned.send(message.author.username + " tried to wake you up.");
          }
          message.channel.send(mentioned.user.username + " wurde angestupst.");
      // If there is not second argument given
      } else if (args[1] == undefined){
        mentioned.send("."); mentioned.send("."); mentioned.send("."); mentioned.send(".");
        mentioned.send(message.author.username + " tried to wake you up.");
        message.channel.send("Tried to wake up " + mentioned.user.username + ".");
      // If something bad was appended...
      } else {
        message.channel.send("Your second Argument is invalid. Enter a number between 1 and 3.");
      }

      // Write log entry for every poke the bot does
      fs.appendFile('logs.txt', "\n[" + command + "] [" + Date.now() + "] " + message.author.username + " -> "  + mentioned.user.username, function (err) {
        if (err) throw err;
        console.log("[" + command + "] [" + Date.now() + "] [" + message.author.username + " -> " + mentioned.user.username + "] Saved event to logs.txt");
      });
  }
});

// Bot login using the bots token
client.login(config.token);