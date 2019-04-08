const Discord = require('discord.js');
const client = new Discord.Client();
const schedule = require('node-schedule');
const commands = require('./command/commands');

const config = require('../config');
let loadTime = new Date().getTime();

client.on('ready', () => {
    console.log(`Bot started in ${new Date().getTime() - loadTime}ms`);
});

client.on('message', msg => {
    commands(client, msg);
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

schedule.scheduleJob('0 50 16 * * *', () => {
    const time = new Date();
    announceNewDay(`The time is *${time}*.\nThe day is ending in 10 minutes.\nRemember to check into your guild, finish daily events, and wrap up arena / events before they terminate.`);
});

schedule.scheduleJob('0 0 17 * * *', () => {
    const time = new Date();
    announceNewDay(`The time is *${time}*.\nYou may now login and claim daily rewards.`);
});

client.login(config.botToken);
