// /******** REQUIRED MODULES ********/
// const chai = require('chai');
// const sinon = require('sinon');
// const { expect } = require('chai');
// const { JSDOM } = require('jsdom');
//
// chai.use(require('chai-dom'));
// require('jsdom-global')();
//
// /******** LOCAL FILE IMPORTS ********/
// const parseDateTimeObj = require('../src/utils/parseDateTime');
// const helperFunctions = require('../src/utils/helperFunctions');
// const { getDateTimeAttribute } = require('./test-utils/helperTestFunctions');
//
// /******** MOCK CONFIG IMPORTS ********/
// const configDefault = require('./mocks/default');
// const config24Hour = require('./mocks/hour24');
// const config11Hour = require('./mocks/hour11');
// const config23Hour = require('./mocks/hour23');
// const configLocale = require('./mocks/new-locale');
// const configWeekday = require('./mocks/no-weekday');
//
// /******** CONSTANTS ********/
// const TEST_FILE_PATH = __dirname + '/index.test.html';
//
// /******** LOCAL VARIABLES ********/
// let dom, document, sandbox, spy, stub;
//
// // @TODO: add invalid date handling
// describe("Screen reader friendly dates:", function() {
//     // create sandbox for testing
//     before(() => {
//         sandbox = sinon.createSandbox();
//     });
//
//     /**
//      * Ensure that the index.html test file is loaded for each
//      * create a stub on getConfig
//      * create a spy on parseDateTime
//      */
//     beforeEach(async function() {
//         await JSDOM.fromFile(TEST_FILE_PATH).then(jsDom => {
//             dom = jsDom;
//             document = dom.window.document;
//         });
//
//         stub = sandbox.stub(helperFunctions, "getConfig");
//         spy = sandbox.spy(parseDateTimeObj, "parseDateTime");
//     });
//
//     /**
//      * resets the sandbox to ensure no carryover between tests
//      */
//     afterEach(() => {
//         sandbox.restore(); // restore all fakes
//     });
//
//     // READ OUT FOR TESTING SPECS
//     console.log('Testing File Path:', TEST_FILE_PATH);
//
//     /**
//      * For full date and time labels such as 2022-05-02T11:30
//      */
//     describe("Full date and time to accessible label (12 hour format)", function () {
//         /**
//          * tests should be completed using the config set: default.json
//          *  "locale": "en-US",
//          *  "hourCycle": "h12",
//          *  "hasWeekday": true
//          */
//         beforeEach(() => {
//             const getConfig = function getConfig() {
//                 return configDefault;
//             };
//             stub.value(getConfig);
//         });
//
//         it("converts numeric date and time to readable string for 12 hour time in the morning", function () {
//             const testElm = getDateTimeAttribute("test-1", document);
//             const parsedTest = parseDateTimeObj.parseDateTime(testElm);
//
//             expect(parsedTest).to.be.a('string');
//             expect(parsedTest).to.equal("Monday, May 2, 2022, 11:30 AM");
//         });
//
//
//         it("converts numeric date and time to readable string for 12 hour time in the evening", function () {
//             const testElm = getDateTimeAttribute("test-2", document);
//             const parsedTest = parseDateTimeObj.parseDateTime(testElm);
//
//             expect(parsedTest).to.be.a('string');
//             expect(parsedTest).to.equal("Friday, February 9, 1990, 7:40 PM");
//         });
//     });
//
//     /**
//      * For full date and time labels such as 2022-05-02T11:30 - 24 hour format
//      */
//     describe("Full date and time to accessible label (24 hour format)", function () {
//         /**
//          * tests should be completed using the config set: default.json
//          *  "locale": "en-US",
//          *  "hourCycle": "h24",
//          *  "hasWeekday": true
//          */
//         beforeEach(() => {
//             const getConfig = function getConfig() {
//                 return config24Hour;
//             };
//             stub.value(getConfig);
//         });
//
//         it("converts numeric date and time to readable string for 24 hour time in the morning", function () {
//             const testElm = getDateTimeAttribute("test-1", document);
//             const parsedTest = parseDateTimeObj.parseDateTime(testElm);
//
//             expect(parsedTest).to.be.a('string');
//             expect(parsedTest).to.equal("Monday, May 2, 2022, 11:30");
//         });
//
//         it("converts numeric date and time to readable string for 24 hour time in the evening", function () {
//             const testElm = getDateTimeAttribute("test-2", document);
//             const parsedTest = parseDateTimeObj.parseDateTime(testElm);
//
//             expect(parsedTest).to.be.a('string');
//             expect(parsedTest).to.equal("Friday, February 9, 1990, 19:40");
//         });
//     });
//
//     /**
//      * For full date and time labels such as 2022-05-02T11:30 - 11 hour format
//      */
//     describe("Full date and time to accessible label (11 hour format)", function () {
//         /**
//          * tests should be completed using the config set: default.json
//          *  "locale": "en-US",
//          *  "hourCycle": "h11",
//          *  "hasWeekday": true
//          */
//         beforeEach(() => {
//             const getConfig = function getConfig() {
//                 return config11Hour;
//             };
//             stub.value(getConfig);
//         });
//
//         it("converts numeric date and time to readable string for 11 hour time in the morning", function () {
//             const testElm = getDateTimeAttribute("test-3", document);
//             const parsedTest = parseDateTimeObj.parseDateTime(testElm);
//
//             expect(parsedTest).to.be.a('string');
//             expect(parsedTest).to.equal("Monday, May 2, 2022, 0:30 AM");
//         });
//
//         it("converts numeric date and time to readable string for 11 hour time in the evening", function () {
//             const testElm = getDateTimeAttribute("test-4", document);
//             const parsedTest = parseDateTimeObj.parseDateTime(testElm);
//
//             expect(parsedTest).to.be.a('string');
//             expect(parsedTest).to.equal("Friday, February 9, 1990, 1:40 PM");
//         });
//     });
//
//     /**
//      * For full date and time labels such as 2022-05-02T11:30 - 23 hour format
//      */
//     describe("Full date and time to accessible label (23 hour format)", function () {
//         /**
//          * tests should be completed using the config set: default.json
//          *  "locale": "en-US",
//          *  "hourCycle": "h24",
//          *  "hasWeekday": true
//          */
//         beforeEach(() => {
//             const getConfig = function getConfig() {
//                 return config23Hour;
//             };
//             stub.value(getConfig);
//         });
//
//         it("converts numeric date and time to readable string for 23 hour time in the morning", function () {
//             const testElm = getDateTimeAttribute("test-3", document);
//             const parsedTest = parseDateTimeObj.parseDateTime(testElm);
//
//             expect(parsedTest).to.be.a('string');
//             expect(parsedTest).to.equal("Monday, May 2, 2022, 0:30 AM");
//         });
//
//         it("converts numeric date and time to readable string for 23 hour time in the evening", function () {
//             const testElm = getDateTimeAttribute("test-4", document);
//             const parsedTest = parseDateTimeObj.parseDateTime(testElm);
//
//             expect(parsedTest).to.be.a('string');
//             expect(parsedTest).to.equal("Friday, February 9, 1990, 13:40");
//         });
//     });
//
//     describe("Sets the date time format based on the locale string", function () {
//         /**
//          * tests should be completed using the config set: new-locale.json
//          *  "locale": "ca-FR",
//          *  "hasWeekday": true
//          */
//         beforeEach(() => {
//             const getConfig = function getConfig() {
//                 return configLocale;
//             };
//             stub.value(getConfig);
//         });
//
//         it("converts the format automatically based on passed locale in the morning", function () {
//             const testElm = getDateTimeAttribute("test-1", document);
//             const parsedTest = parseDateTimeObj.parseDateTime(testElm);
//
//             expect(parsedTest).to.be.a('string');
//             expect(parsedTest).to.equal("dilluns, 2 de maig de 2022, 11:30");
//         });
//
//         it("converts the format automatically based on passed locale in the evening", function () {
//             const testElm = getDateTimeAttribute("test-2", document);
//             const parsedTest = parseDateTimeObj.parseDateTime(testElm);
//
//             expect(parsedTest).to.be.a('string');
//             expect(parsedTest).to.equal("divendres, 9 de febrer de 1990, 19:40");
//         });
//     });
//
//     describe("Full date to accessible label", function () {
//         it("converts numeric date to readable string", function () {
//
//         });
//     });
//
//     describe("Time only to accessible label", function () {
//         describe("in hour 12 hour format", function () {
//             it("converts numeric time in 12 hour format to readable string", function () {
//
//             });
//         });
//
//         describe("in hour 24 hour format", function () {
//             it("converts numeric time in 24 hour format to readable string", function () {
//
//             });
//         });
//     });
//
//     describe("Single piece of date to accessible label", function () {
//         describe("Year only to accessible label", function () {
//             it("converts numeric year to readable string", function () {
//
//             });
//         });
//
//         describe("Month only to accessible label", function () {
//             it("converts numeric month to readable string", function () {
//
//             });
//         });
//
//         describe("Month and date only to accessible label", function () {
//             it("converts numeric month and date to readable string", function () {
//
//             });
//         });
//
//         describe("Year and month only to accessible label", function () {
//             it("converts numeric month and year to readable string", function () {
//
//             });
//         });
//     });
// });
