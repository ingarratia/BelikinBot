function loadCommands(client){
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading('Commands', 'Status');
    let commandsArray = [];
    const folders = fs.readdirSync('./src/Commands');
    for (const folder of folders) {
        const commandsFiles = fs.readdirSync(`./src/Commands/${folder}`).filter((file) => file.endsWith('.js'));

        for (const file of commandsFiles) {
            const commandFile = require(`../Commands/${folder}/${file}`);
            client.commands.set(commandFile.data.name, commandFile);

            commandsArray.push(commandFile.data.toJSON());

            table.addRow(file, '✔️');
            continue;
        }
    }
    client.application.commands.set(commandsArray);
    return console.log(table.toString(), '\n Comandos cargados correctamente');
}

module.exports = {
    loadCommands,
};