/******** CONSTANTS ********/
const DATE_CONSTANTS = require('../Constants/date');
const { HOUR_CYCLE, HOUR_CYCLE_VALUES } = require('../Constants/hour-cycles');
const { LOCALE_TYPES } = require('../Constants/locale-types');

// /******** LOCAL FILE IMPORTS ********/
const { removeEmptyValuesFromObject } = require('./helperFunctions');
// const configuration = require('./getConfiguration');
// const config = configuration.getConfig();

/**
 * @function getDateFormat
 * @description
 * @param dateFormat {String} - the expected format
 * @param date {Date} - the Date object from the datetime attribute
 * @param hasWeekday {boolean} - whether weekday is present
 * @returns {null|number}
 */
function getDateFormat(dateFormat, date, hasWeekday = false) {
    let configValue = "numeric";
    let formatValue;

    switch (dateFormat) {
        case DATE_CONSTANTS.WEEKDAY:
            configValue = "long";
            formatValue = hasWeekday ? date.getDay() : null;
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
            formatValue = date.getHours();
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
 * @function getHourCycleValue
 * @description verifies and grabs the hour cycle value for build the config value
 * @param configValue {String} - the provided value from config.json
 * @returns {string}
 */
function getHourCycleValue(configValue) {
    let hourCycle;

    switch(configValue.toLowerCase()) {
        case HOUR_CYCLE_VALUES.H11:
            hourCycle = HOUR_CYCLE_VALUES.H11;
            break;
        case HOUR_CYCLE_VALUES.H12:
            hourCycle = HOUR_CYCLE_VALUES.H12;
            break;
        case HOUR_CYCLE_VALUES.H23:
            hourCycle = HOUR_CYCLE_VALUES.H23;
            break;
        case HOUR_CYCLE_VALUES.H24:
            hourCycle = HOUR_CYCLE_VALUES.H24;
            break;
        default:
            hourCycle = null;
            break;
    }

    return hourCycle;
}

/**
 * @function buildTimeConfig
 * @description builds the time portion of the datetime string
 * @param date {Date}
 * @param hourCycle {string}
 * @returns {Object}
 */
function buildTimeConfig(date, hourCycle) {
    const timeConfig = {};

    timeConfig[DATE_CONSTANTS.HOUR] = getDateFormat(DATE_CONSTANTS.HOUR, date);
    timeConfig[DATE_CONSTANTS.MINUTES] = getDateFormat(DATE_CONSTANTS.MINUTES, date);
    timeConfig[DATE_CONSTANTS.SECONDS] = getDateFormat(DATE_CONSTANTS.SECONDS, date);

    if (hourCycle) {
        timeConfig[HOUR_CYCLE] = getHourCycleValue(hourCycle);
    }

    return timeConfig;
}

/**
 * @function buildDateConfig
 * @descrition builds the configuration for the date portion of the date time string
 * @param date {Date}
 * @param hasWeekday {boolean}
 * @returns {object}
 */
function buildDateConfig(date, hasWeekday = false) {
    const dateConfig = {};

    dateConfig[DATE_CONSTANTS.MONTH] = getDateFormat(DATE_CONSTANTS.MONTH, date);
    dateConfig[DATE_CONSTANTS.DAY] = getDateFormat(DATE_CONSTANTS.DAY, date);
    dateConfig[DATE_CONSTANTS.YEAR] = getDateFormat(DATE_CONSTANTS.YEAR, date);

    if (hasWeekday) {
        dateConfig[DATE_CONSTANTS.WEEKDAY] = getDateFormat(DATE_CONSTANTS.WEEKDAY, date, hasWeekday);
    }

    return dateConfig;
}

/**
 * @function buildLocaleConfig
 * @description
 * @param date {Date} - Date object
 * @param userConfig {Object} - user config settings
 * @param {string} localeType - the locale type
 * @return {Object} - contains all of the formatting for the newly formatted timestamp
 *                    based on what is currently in the timestamp param
 */
exports.buildLocaleConfig = function buildLocaleConfig(date, userConfig, localeType) {
    let dateTimeConfig = {};

    // DATE_TIME, TIME_ONLY => include time config
    if (localeType !== LOCALE_TYPES.DATE_ONLY) {
        dateTimeConfig = buildTimeConfig(date, userConfig.hourCycle);
    }

    // DATE_TIME, DATE_ONLY => include date config
    if (localeType !== LOCALE_TYPES.TIME_ONLY) {
        const dateConfig = buildDateConfig(date, userConfig.hasWeekday);
        dateTimeConfig = {
            ...dateTimeConfig,
            ...dateConfig
        };
    }

    return removeEmptyValuesFromObject(dateTimeConfig);
}
