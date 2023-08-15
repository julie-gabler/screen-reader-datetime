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
 * @function hasDate
 * @description validates that a time is present in the date string
 * @param dateStr {String}
 */
exports.hasTime = function hasTime(dateStr) {
    return dateStr.includes('T');
}
