# discord-wakebot 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![GitHub version](https://badge.fury.io/gh/redii%2Fdiscord-wakebot.svg)](https://badge.fury.io/gh/redii%2Fdiscord-wakebot)

A simple Discord.js bot to wake up inactive or muted users on your server. The bot is at the moment in an very early stage of development, thats why it does not have any error handling.

**Demo:** Im currently hosting a version of the bot on my own server. To add the wakeBot to your server click [here](https://discordapp.com/oauth2/authorize?client_id=362303227871625219&scope=bot&permissions=1117184).

## Installation
First you have to clone the repository to your desired location with:

    git clone https://github.com/redii/discord-wakebot.git

Beside this, you have to create an **config.json** file in the cloned directory, which will store the prefix and your bots token. The content should then look like this:

    {
    "token":"Your_Bots_Token",
    "prefix":"!",
    }

## Usage
The bot is pretty simple to use, just write in any server channel:

    !wake @xyz <1-3>

In order to work properly you have to **mention** the person you want to wake up. The bot will then quickly try to wake up the specified person through messages in direct chat. If the person wont react, you can poke him a bit more with adding an number between 1 and 3 as second argument, so the bot will send the messages multiple times. The output should be:

    .
    ┌─────────────────────────────────────┐
    ├────── XYZ tried to wake you up ─────┤
    └─────────────────────────────────────┘
    .

### Why this way?
Since bots can not call real users, the only way to get any attention is to send them messages. The bot will send 5 messages, as shown above, to the specified user.

Another problem is that Discord gives you a chat cooldown after 5 messages so you or the bot have to wait a few seconds before sending the messages again.
