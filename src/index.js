"use strict";

const { parseDateTime } = require("./utils/parseDateTime");
const {
    ARIA_LABEL,
    DATETIME_ATTRIBUTE,
    TIME_ELEMENT
} = require('./Constants/attributes');

/**
 * @function updateElmsWithAccessibleLabels
 * @description parses through an array of Elements and sets the
 *              aria-label with an accessible label
 * @param timeElms {Array[Element]} - array of time elements on the page
 */
function updateElmsWithAccessibleLabels(timeElms) {
    timeElms.forEach((timeElm, index) => {
        const dateTime = timeElm.getAttribute(DATETIME_ATTRIBUTE);
        const parsedDateTime = parseDateTime(dateTime);
        timeElm.setAttribute(ARIA_LABEL, parsedDateTime);
    });
}

/**
 * @function accessibleDateTime
 * @description Searches the page for <time> elements, grabs the datetime
 *              attributes, and formulates an accessible date readout, and
 *              then sets the aria-label on the <time> element
 *              Screen readers will announce the aria-label that contains the
 *              accessible date time format
 */
function accessibleDateTime() {
    const timeElms = [...document.getElementsByTagName(TIME_ELEMENT)];
    updateElmsWithAccessibleLabels(timeElms);
}


module.exports = { accessibleDateTime, updateElmsWithAccessibleLabels };
