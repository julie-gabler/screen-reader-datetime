/**
 * @function validateLocale
 * @param locale {String}
 */
exports.validateLocale = function validateLocale(locale) {
    let confirmLocale;

    try {
        confirmLocale = new Intl.Locale(locale);
    } catch(err) {
        return false;
    }

    return confirmLocale;
}
