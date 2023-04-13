
const { REST, Routes } = require('discord.js');
const config = require('..//config/config');

const TOKEN = config.DISCORD.TOKEN
const CLIENT_ID = config.DISCORD.CLIENT_ID

const rest = new REST({ version: '10' }).setToken(TOKEN);

const commandJSON = require('..//config/load');

function loadCommands() {
    
    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commandJSON.commands.commands });

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}


module.exports = {
    loadCommands,
};