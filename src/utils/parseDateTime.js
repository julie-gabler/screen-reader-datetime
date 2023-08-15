/******** LOCAL FILE IMPORTS ********/
const { buildLocaleConfig } = require("./buildLocaleConfig");
const configuration = require("./getConfiguration");
const { hasTime, isValidDate } = require('./helperFunctions');
const {
    standarizedDateTimeString,
    standarizedTimeString
} = require('./standarizedDateTime');

/******** CONSTANTS ********/
const { LOCALE_TYPES } = require('../Constants/locale-types');

/**
 * @function getLocaleTimeString
 * @description formats a string
 * @param timestamp {string}
 * @param config {object}
 * @returns {string}
 */
function getLocaleTimeString(timestamp, config) {
    const formattedTimeStamp = standarizedTimeString(timestamp);
    const time = new Date(formattedTimeStamp);

    return new Date(formattedTimeStamp).toLocaleTimeString(
        config.locale,
        buildLocaleConfig(time, LOCALE_TYPES.TIME_ONLY)
    );
}

/**
 * @function parseDateTime
 * @param datetime {string} - contains date and/or time in string format
 * @returns {string} - accessible format for the aria-label
 */
exports.parseDateTime = function parseDateTime(datetime) {
    const dateTimeStamp = standarizedDateTimeString(datetime);
    const date = new Date(dateTimeStamp);
    const config = configuration.getConfig();
    const hasTimeString = hasTime(datetime);
    const validDate = isValidDate(date);

    if (validDate && hasTimeString) {
        return new Date(dateTimeStamp).toLocaleString(
            config.locale,
            buildLocaleConfig(date, LOCALE_TYPES.DATE_TIME)
        );
    } else if(validDate) {
        // ignores the time string if any
        return new Date(dateTimeStamp).toLocaleDateString(
            config.locale,
            buildLocaleConfig(date, LOCALE_TYPES.FULL_DATE_ONLY)
        );
    }

    return getLocaleTimeString(datetime, config);
}
