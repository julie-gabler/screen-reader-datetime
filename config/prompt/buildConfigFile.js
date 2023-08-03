const fs = require('fs');
const CONFIG_FOLDER_NAME = "config/";
const CONFIG_FILE_NAME = "config.json";

/**
 * @function getConfigDirectory
 * @description grabs the path for the config directory since prompt is a sub directory
 * @returns {string}
 */
function getConfigDirectory () {
    const currentPath = __dirname;
    const index = currentPath.indexOf(CONFIG_FOLDER_NAME) + CONFIG_FOLDER_NAME.length;
    return currentPath.substr(0, index);
}

/**
 *
 * @param responses {Object}
 */
exports.createConfigFile = function buildConfigFile(responses) {
    const configPath = getConfigDirectory() + CONFIG_FILE_NAME;
    const configJSON = JSON.stringify(responses);
    (Object.keys(responses)).forEach((key) => console.log(`${key}: ${responses[key]}`));
    fs.writeFile(configPath, configJSON, 'utf8', (err) => {
        if (err) {
            throw err;
        }
        console.log('Config file was created.');
    });
}
