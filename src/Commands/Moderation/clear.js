const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears messages')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages) // Only users with the Manage Messages permission can use this command 
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Amount of messages to clear')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to clear messages from')
                .setRequired(false)
        ),
    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.getInteger('amount');
        const target = options.getUser('target');

        //TODO: agregar validacion para evitar que se rompa cuando la cantidad de mensajes es menos a los que existen en el canal
        //FIXME: arreglar el bug que hace que no se borren los mensajes
        messages = await channel.messages.fetch({
            limit: amount + 1
        });
        console.log(messages);


        const res = new EmbedBuilder()
            .setColor(0X5fb041)

        if (target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) => {
                if (msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`Deleted ${messages.size} messages from ${target}`);
                interaction.reply({ embeds: [res] });
            });
        } else {
            await channel.bulkDelete(amount).then(messages => {
                res.setDescription(`Deleted ${messages.size} messages`);
                interaction.reply({ embeds: [res] });
            });
        }
    }
}