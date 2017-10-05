# discord-wakebot 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![GitHub version](https://badge.fury.io/gh/redii%2Fdiscord-wakebot.svg)](https://badge.fury.io/gh/redii%2Fdiscord-wakebot)

A simple Discord.js bot to wake up inactive or muted users on your server.

**Demo:** Im currently hosting an instance of the bot on my own vps. To add the wakeBot to your server click [here](https://discordapp.com/oauth2/authorize?client_id=362303227871625219&scope=bot&permissions=1117184).

## Usage
The bot currently support 3 different commands with the following syntaxes:
* help ..................... !help
* wake .................... !wake @xyz#1234 <1-3>
* admin
  - prefix .......... !admin prefix <new_prefix>

### !wake Command
To use the wake command type in the prefix + command (!wake) and a **mention** of the person you want to wake up. It should look like the sample syntax above. After sending the message the bot will try to wake up the specified person through messages in direct chat. If the person wont react, you can poke him a bit more by adding a number between 1 and 3 as second argument, so the bot will send the messages multiple times. The output should be something like this:

    .
    .
    .
    .
    xyz tried to wake you up.

You may also want to disable the discord desktop notifications since they pop up a bit laggy (just annoyed me a bit).

## Installation (Selfhosting on Ubuntu)
If you want to selfhost an instance of the bot on your own device you can do this by completing the following instructions. I currently only have a Ubuntu server so this quick guide is only for those who also have ubuntu available. Before we will clone this repository onto your vps we need to make sure **git and node.js** are installed and ready to use. We will add a new user and than install all dependencies:

    adduser wakebot
    apt-get install git nodejs nano

After finishing the installation you are now able to clone this repository. But before we do this we have to decide where the bot should be located. We will install the bot in the home folder of the wakebot user with the following commands:

    su wakebot
    cd
    git clone https://github.com/redii/discord-wakebot.git

After successfully copying the repository, you have to rename the **config.json** file, which will store the prefix, your bots token for authentication and your own ClientID to determine yourself as the bots owner. We will do this be typing in:

    cd discord-wakebot/
    mv config.json.sample config.json
    nano config.json
    And enter your desired configurations.

The config.json content should then look like this (with your entered credentials):

    {
        "token":"Your_Bots_Token",
        "prefix":"!",
        "ownerID":"Your_ClientID"
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
