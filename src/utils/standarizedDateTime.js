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
