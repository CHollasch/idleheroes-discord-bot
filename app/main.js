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

const job = schedule.scheduleJob('0 50 16 * * *', () => {
    console.log('Running job');
});

client.login(config.botToken);
