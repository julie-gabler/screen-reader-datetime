/**
 * @function getConfig
 * @description grabs the config file generated if available
 *              else grabs the default that is always present
 */
exports.getConfig = function getConfig() {
    let config;
    try {
        config = require("../../config/config");
    } catch (er) {
        config = require("../../config/default");
    }

    return config;
}
