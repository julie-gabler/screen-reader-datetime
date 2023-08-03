/******** REQUIRED MODULES ********/
const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const { getConfig } = require('../src/utils/helperFunctions');


/******** LOCAL FILE IMPORTS ********/
const { parseDateTime: parseDateTimeTest } = require('../src/utils/parseDateTime');
const { getDateTimeAttribute } = require('./test-utils/helperTestFunctions');

/******** MOCK CONFIG IMPORTS ********/
const config = require('../config/config');
const config24Hour = require('./mocks/hour24');

chai.use(require('chai-dom'));
require('jsdom-global')();

/******** CONSTANTS ********/
const TEST_FILE_PATH = __dirname + '/index.test.html';

/******** LOCAL VARIABLES ********/
let dom, document, sandbox, stub;

// @TODO: add invalid date handling
describe("Screen reader friendly dates:", function() {
    // Ensure that the index.html test file is loaded for each
    before(async function() {
        await JSDOM.fromFile(TEST_FILE_PATH).then(jsDom => {
            dom = jsDom;
            document = dom.window.document;
        });
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    // READ OUT FOR TESTING SPECS
    console.log('Testing File Path:', TEST_FILE_PATH);

    /**
     * For full date and time labels such as 2022-05-02T11:30
     */
    describe("Full date and time to accessible label", function () {
        /**
         * tests should be completed using the config set:
         *
         */
        it("converts numeric date and time to readable string for 12 hour time in the morning", function () {
            const testElm = getDateTimeAttribute("test-1", document);
            const parsedTest = parseDateTimeTest(testElm);

            expect(parsedTest).to.be.a('string');
            expect(parsedTest).to.equal("Monday, May 2, 2022, 11:30 AM");
        });

        it("converts numeric date and time to readable string for 12 hour time in the evening", function () {
            const testElm = getDateTimeAttribute("test-2", document);
            const parsedTest = parseDateTimeTest(testElm);

            expect(parsedTest).to.be.a('string');
            expect(parsedTest).to.equal("Friday, February 9, 1990, 7:40 PM");
        });

        it("converts numeric date and time to readable string for 24 hour time in the morning", function () {
            before(() => {
                stub = sinon.stub(getConfig);
            });

            after(() => {
                getConfig.restore();
            });

            const config24Hour = {
                "locale": "en-US",
                "hourCycle": "h24",
                "hasWeekday": true
            };

            stub.callsFake(() => config24Hour);
            const testElm = getDateTimeAttribute("test-1", document);
            const parsedTest = parseDateTimeTest(testElm);

            expect(parsedTest).to.be.a('string');
            expect(parsedTest).to.equal("Monday, May 2, 2022, 11:30");
        });


        it("converts numeric date and time to readable string for 24 hour time in the evening", function () {
            // const testElm = getDateTimeAttribute("test-2", document);
            // const parsedTest = parseDateTimeTest(testElm);
            // expect(parsedTest).to.be.a('string');
            // expect(parsedTest).to.equal("Friday, February 9, 1990, 19:40");
        });
    });

    describe("Sets the date time format based on the locale string", function () {
        it("converts the format automatically based on passed locale", function () {

        });
    });

    describe("Full date to accessible label", function () {
        it("converts numeric date to readable string", function () {

        });
    });

    describe("Time only to accessible label", function () {
        describe("in hour 12 hour format", function () {
            it("converts numeric time in 12 hour format to readable string", function () {

            });
        });

        describe("in hour 24 hour format", function () {
            it("converts numeric time in 24 hour format to readable string", function () {

            });
        });
    });

    describe("Single piece of date to accessible label", function () {
        describe("Year only to accessible label", function () {
            it("converts numeric year to readable string", function () {

            });
        });

        describe("Month only to accessible label", function () {
            it("converts numeric month to readable string", function () {

            });
        });

        describe("Month and date only to accessible label", function () {
            it("converts numeric month and date to readable string", function () {

            });
        });

        describe("Year and month only to accessible label", function () {
            it("converts numeric month and year to readable string", function () {

            });
        });
    });
});
