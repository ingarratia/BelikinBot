const fs = require('fs');
const yaml = require('js-yaml');

const configFile = './config.yaml';

try {
    const fileContents = fs.readFileSync(configFile, 'utf8');
    const config = yaml.load(fileContents);
    module.exports = config;
} catch (error) {
    console.error(`Error al leer el archivo ${configFile}:`, error);
    process.exit(1);
}