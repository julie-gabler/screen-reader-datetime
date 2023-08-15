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
 * @description returns a time only string for the date
 * @param timestamp {string} time string to be formatted
 * @param config {object} config object
 * @returns {string}
 */
function getLocaleTimeString(timestamp, config) {
    const formattedTimeStamp = standarizedTimeString(timestamp);
    const time = new Date(formattedTimeStamp);

    return new Date(formattedTimeStamp).toLocaleTimeString(
        config.locale,
        buildLocaleConfig(time, config, LOCALE_TYPES.TIME_ONLY)
    );
}

/**
 * @function parseDateTime
 * @description parses the date time for
 * @param datetime {string} - contains date and/or time in string format
 * @returns {string} - accessible format for the aria-label
 */
exports.parseDateTime = function parseDateTime(datetime) {
    const config = configuration.getConfig();
    const dateTimeStamp = standarizedDateTimeString(datetime);
    const date = new Date(dateTimeStamp);

    const hasTimeString = hasTime(datetime);
    const validDate = isValidDate(date);

    if (validDate && hasTimeString) {
        return new Date(dateTimeStamp).toLocaleString(
            config.locale,
            buildLocaleConfig(date, config, LOCALE_TYPES.DATE_TIME)
        );
    } else if(validDate) {
        return new Date(dateTimeStamp).toLocaleDateString(
            config.locale,
            buildLocaleConfig(date, config, LOCALE_TYPES.FULL_DATE_ONLY)
        );
    }

    return getLocaleTimeString(datetime, config);
}
