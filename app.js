const { REST, Routes } = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN = "ODQ3MTA2NjM4MjkxOTI3MDky.GvFroq.laF4_IIPFtJeN129bx5UisnLWE_27BhniRySQ0"
const CLIENT_ID = "847106638291927092"

const user = interaction.options.getUser('target');

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'hola',
    description: 'Replies with a greeting',
  },
  {
    name: 'HolaPersonal',
    description: ''
  }
];


const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'hola') {
    await interaction.reply('hola marica ey');
  } else if (interaction.commandName === 'HolaPersonal') {
    await interaction.followUp(`Hi, <@${user.id}>.`);
  }
});

client.login(TOKEN);