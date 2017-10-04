# discord-wakebot 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![GitHub version](https://badge.fury.io/gh/redii%2Fdiscord-wakebot.svg)](https://badge.fury.io/gh/redii%2Fdiscord-wakebot)

A simple Discord.js bot to wake up inactive or muted users on your server.

**Demo:** Im currently hosting an instance of the bot on my own vps. To add the wakeBot to your server click [here](https://discordapp.com/oauth2/authorize?client_id=362303227871625219&scope=bot&permissions=1117184).

## Usage
The bot currently supports only 2 different commands, !help and !wake. While the help command does not need any more arguments, the !wake command has to be used with the following syntax:

    !wake @xyz#1234 <1-3>

In order to work properly you have to **mention** the person you want to wake up. The bot will then quickly try to wake up the specified person through messages in direct chat. If the person wont react, you can poke him a bit more with adding a number between 1 and 3 as second argument, so the bot will send the messages multiple times. The output should be something like this:

    .
    .
    .
    .
    xyz tried to wake you up.

You may also want to disable the discord desktop notifications since they pop up a bit laggy (just annoyed me a bit).

## Installation (Selfhosting on Ubuntu)
If you want to selfhost an instance of the bot on your own device you can do this by completing the following instructions. Before we will clone this repository onto your device you need to make sure **git and node.js** are installed and ready to use. 

After finishing the installation you are now able to clone this repository using the following command:

    git clone https://github.com/redii/discord-wakebot.git

Beside this, you have to create/rename the **config.json** file in the cloned directory, which will store the prefix and your bots token for authentication. The content should then look like this:

    {
        "token":"Your_Bots_Token",
        "prefix":"!"
    }

Now you should be able to start up the bot by typing in *"node wakebot.js"* and execute it.

## Logging
In order to keep track of your instance of the bot, you can check the logs.txt file for some informations. While running, the bot should save wake-events and restarts in a logfile in your cloned directory. The file should look like this:

    ...
    [bot] [1507107732492] The bots status is set to ready.
    [wake] [1507107753213] abc -> xyz
    [wake] [1507107761077] xyz -> qwe
    ...

## Extras

### Why this way?
Since bots can not call real users, the only way to get any attention is to send them messages. The bot will send 5 messages, as shown above, to the specified user.

Another problem is that discord gives you a chat cooldown after 5 messages so you have to wait a few seconds before sending the messages again.

### To-Do
* Delete spaceholder "." messages for clean chats
* Delete the "xyz tried to wake you up" after a period of time
* Add discord.js errorhandler to logging process in logs.txt (filter)
