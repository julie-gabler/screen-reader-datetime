/******** CONSTANTS ********/
const DATE_CONSTANTS = require("../Constants/date");

/******** LOCAL FILE IMPORTS ********/
const helperFunctions = require("./helperFunctions");
const config = helperFunctions.getConfig();

/**
 * @function getDateFormat
 * @description
 * @param dateFormat {String} - the expected format
 * @param date {Date} - the Date object from the datetime attribute
 * @returns {null|number}
 */
function getDateFormat(dateFormat, date) {
    let configValue = "numeric";
    let formatValue;

    switch (dateFormat) {
        case DATE_CONSTANTS.WEEKDAY:
            configValue = "long";
            formatValue = config.hasWeekday ? date.getDay() : 0;
            break;
        case DATE_CONSTANTS.MONTH:
            configValue = "long";
            formatValue = date.getDate();
            break;
        case DATE_CONSTANTS.DAY:
            formatValue = date.getDate();
            break;
        case DATE_CONSTANTS.YEAR:
            formatValue = date.getFullYear();
            break;
        case DATE_CONSTANTS.HOUR:
            /**
             * Corrects a bug with Date where if no time is present in the string,
             * the date.getHours will return a value when it should be 0
             */
            formatValue = date.getUTCHours() !== 0 ? date.getHours() : 0;
            break;
        case DATE_CONSTANTS.MINUTES:
            formatValue = date.getMinutes();
            break;
        case DATE_CONSTANTS.SECONDS:
            formatValue = date.getSeconds();
            break;
        case DATE_CONSTANTS.MILLISECONDS:
            formatValue = date.getMilliseconds();
            break;
        default:
            formatValue = 0;
            break;
    }

    if (formatValue !== 0) {
        return configValue;
    }

    return null;
}

/**
 * @function buildLocaleConfig
 * @description
 * @param date {Date} - Date object
 * @param {boolean} isTimeOnly - default false; sets up the config for time only
 * @return {Object} - contains all of the formatting for the newly formatted timestamp
 *                    based on what is currently in the timestamp param
 */
exports.buildLocaleConfig = function buildLocaleConfig(date, isTimeOnly = false) {
    const dateTimeConfig = {
        [DATE_CONSTANTS.HOUR]: getDateFormat(DATE_CONSTANTS.HOUR, date),
        [DATE_CONSTANTS.MINUTES]: getDateFormat(DATE_CONSTANTS.MINUTES, date),
        [DATE_CONSTANTS.SECONDS]: getDateFormat(DATE_CONSTANTS.SECONDS, date)
    };

    if(config.is12HourFormat && dateTimeConfig[DATE_CONSTANTS.HOUR]) {
        dateTimeConfig[DATE_CONSTANTS.HOUR12] = is12HourFormat;
    } else if (dateTimeConfig[DATE_CONSTANTS.HOUR]) {
        dateTimeConfig[DATE_CONSTANTS.HOUR_CYCLE] = 'h23'; // 0-23 hour format instead of 1-24
    }

    /**
     * check to ensure we don't want to return the time string only instead of
     * all possible parts of the Date time
     */
    if (!isTimeOnly) {
        dateTimeConfig[DATE_CONSTANTS.WEEKDAY] = getDateFormat(
            DATE_CONSTANTS.WEEKDAY,
            date
        );
        dateTimeConfig[DATE_CONSTANTS.MONTH] = getDateFormat(
            DATE_CONSTANTS.MONTH,
            date
        );
        dateTimeConfig[DATE_CONSTANTS.DAY] = getDateFormat(
            DATE_CONSTANTS.DAY,
            date
        );
        dateTimeConfig[DATE_CONSTANTS.YEAR] = getDateFormat(
            DATE_CONSTANTS.YEAR,
            date
        );
    }

    return helperFunctions.removeEmptyValuesFromObject(dateTimeConfig);
}
