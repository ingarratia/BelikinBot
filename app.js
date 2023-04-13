const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('./src/config/config');
/* const { loadCommands } = require('./src/service/upCommandsService'); */

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMembers, Channel } = Partials;

const { loadEvents } = require('./src/Handlers/eventHandler');
const { loadCommands } = require('./src/Handlers/commandsHandler');

const client = new Client({ 
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMembers],
});

const TOKEN = config.DISCORD.TOKEN;
client.commands = new Collection();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(TOKEN).then(() => {
  loadEvents(client);
  loadCommands(client);
});