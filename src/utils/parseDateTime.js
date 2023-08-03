/******** LOCAL FILE IMPORTS ********/
const { buildLocaleConfig } = require("./buildLocaleConfig");
const {
    getConfig,
    isValidDate,
    standarizedDateTimeString,
    standarizedTimeString
} = require("./helperFunctions");

/**
 * @function parseTimeOnly
 * @description formats the date time for
 * @param timestamp
 * @returns {string}
 */
function parseTimeOnly(timestamp) {
    const formattedTimeStamp = standarizedTimeString(timestamp);
    const time = new Date(formattedTimeStamp);

    return new Date(formattedTimeStamp).toLocaleString(
        config.locale,
        buildLocaleConfig(time, true)
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
    const config = getConfig();

    if (isValidDate(date)) {
        return new Date(dateTimeStamp).toLocaleTimeString(
            config.locale,
            buildLocaleConfig(date)
        );
    }

    return parseTimeOnly(datetime);
}
