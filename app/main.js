const Discord = require('discord.js');
const client = new Discord.Client();
const schedule = require('node-schedule');
const commands = require('./command/commands');

const config = require('../config');
let scriptTime = new Date().getTime();

// Now hook.
require('http').createServer().listen(80);

function start() {
    client.user.setPresence({
        game: {
            name: 'Idle Heroes'
        },
        status: 'online'
    });

    function announceNewDay(message) {
        client.guilds.forEach(guild => {
            const newDayChannel = guild.channels.find(channel => channel.name === 'new-day');

            if (!newDayChannel) {
                return;
            }

            newDayChannel.send(message);
        });
    }

    client.on('message', msg => {
        commands(client, msg);
    });

    schedule.scheduleJob('0 50 16 * * *', () => {
        announceNewDay(`@everyone\nThe day is ending in 10 minutes.\nRemember to check into your guild, finish daily events, and wrap up arena / events before they terminate.`);
    });

    schedule.scheduleJob('0 0 17 * * *', () => {
        announceNewDay(`@everyone\nYou may now login and claim daily rewards.`);
    });
}

client.on('ready', () => {
    console.log(`Bot started in ${new Date().getTime() - scriptTime}ms`);
    start();
});

if (config.botToken) {
    client.login(config.botToken);
} else {
    client.login(process.env.TOKEN);
}

