const DATETIME_ATTRIBUTE = "datetime";

/**
 * @function getDateTimeAttribute
 * @description grabs the element by id and then grabs the datetime attribute
 * @param elmID {string} - the id string to search for
 * @param document {Document}- the window document element
 * @returns {string} the formatted datetime string
 */
exports.getDateTimeAttribute = function getDateTimeAttribute(elmID, document) {
    return document.getElementById(elmID)
        .getAttribute(DATETIME_ATTRIBUTE);
}
