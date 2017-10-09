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
    message.channel.send("Hello and welcome :)\nThank you for using the bot! There are currently 3 supported commands:");
    message.channel.send("- help (where you are currently in...)\n- wake (the main function of this bot)\n- admin (bot owner only)");
    message.channel.send("\n\nYou can use the wake command by following this syntax\n!wake @xyz#1234 <1-3>");
    message.channel.send("\nBy typing in this message, the bot will poke the mentioned user multiplied by the optional second argument.");
  }

  // If command equals admin do...
  if (command == "admin") {
    if (message.author.id == config.ownerID) {
      if (args[0] == "prefix") {
        if (args[1] != undefined) {
          config.prefix = args[1];
          message.channel.send("The Bots Prefix was changed to: " + args[1] + ".");
        } else {
          message.channel.send("Please enter a valid new prefix.");
        }
      }
    } else {
      message.channel.send("You are not the bot owner! Set your ClientID in the config.json file if you are indeed the owner.");
    }
    
  }

  // If command equals wake do...
  if (command == "wake") {
    var mentioned = message.mentions.members.first();

    // If the message contains a mention do...
    if (message.mentions.members.first() != undefined) {
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
    } else {
      message.channel.send("Please enter a mention so the bot can understand who you want to wake up.");
    }
  }
});

// Bot login using the config.token var
client.login(config.token);