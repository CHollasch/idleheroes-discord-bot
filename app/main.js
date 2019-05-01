const Discord = require('discord.js');
const client = new Discord.Client();
const schedule = require('node-schedule');
const commands = require('./command/commands');

let scriptTime = new Date().getTime();

// Heroku.
require('http').createServer().listen(process.env.PORT || 3000);

function start(time) {
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

    schedule.scheduleJob('0 50 16 * * * *', () => {
        announceNewDay(`@everyone\nThe day is ending in 10 minutes.\nRemember to check into your guild, finish daily events, and wrap up arena / events before they terminate.`);
    });

    schedule.scheduleJob('0 0 17 * * * *', () => {
        announceNewDay(`@everyone\nYou may now login and claim daily rewards.`);
    });

    client.guilds.forEach(guild => {
        const modSpamChannel = guild.channels.find(channel => channel.name === 'mod-spam');

        if (!modSpamChannel) {
            return;
        }

        modSpamChannel.send(`Bot successfully loaded in ${time}ms`);
        modSpamChannel.send(`${process.env}`)
    });
}

client.on('ready', () => {
    const delta = new Date().getTime() - scriptTime
    console.log(`Bot started in ${delta}ms`);
    start(delta);
});

client.login(process.env.TOKEN);

