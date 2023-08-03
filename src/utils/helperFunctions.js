/**
 * @function removeEmptyValuesFromObject
 * @description parses a non-nested object and removes all keys with null values
 *              returns a new object that contains key/value pairs that aren't null
 * @param obj {Object} - object to remove null values from
 * @returns {Object}
 */
exports.removeEmptyValuesFromObject = function removeEmptyValuesFromObject(obj) {
    return Object.entries(obj)
        .filter(([_, v]) => v != null)
.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}

/**
 * @function isValidDate
 * @description validates that the Date object is a valid
 *              date and does not return an error
 * @param {*} date
 */
exports.isValidDate = function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
}

/**
 * @function standarizedDateTimeString
 * @description fixes a bug where the date returned will be
 *              -1 day from the given day if no time is present
 *              in the string.
 *              Does not affect whether time is present in the
 *              final string
 * @param {string} timestamp
 */
exports.standarizedDateTimeString = function standarizedDateTimeString(timestamp) {
    const hasTime = timestamp.includes("T") || timestamp.includes(":");
    return hasTime ? timestamp : timestamp + "T00:00";
}

/**
 * @function standarizedTimeString
 * @description appends a date to allow for the use of new Date without a NaN
 *              Date() does not accept 0000-00-00T or no date
 * @param timestamp {string}
 * @returns {string}
 */
exports.standarizedTimeString = function standarizedTimeString(timestamp) {
    return "1990-09-09T" + timestamp;
}

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
