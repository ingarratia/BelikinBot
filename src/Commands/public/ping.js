const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR),
        async execute(interaction, client) {
            await interaction.deferReply({content: "Pinging..."});

            const apiPing = Math.round(client.ws.ping);
            const reply = await interaction.fetchReply();

            const ping = reply.createdTimestamp - interaction.createdTimestamp;

            await interaction.editReply({content: `Pong! Client ${ping}ms | API ${apiPing}ms`});
            /* interaction.reply({content: `API Ping: ${apiPing}ms`, ephemeral: true}); */
        },
};

