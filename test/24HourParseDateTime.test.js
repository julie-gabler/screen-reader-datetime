/******** REQUIRED MODULES ********/
const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const { JSDOM } = require('jsdom');

chai.use(require('chai-dom'));
require('jsdom-global')();

/******** LOCAL FILE IMPORTS ********/
const parseDateTimeObj = require('../src/utils/parseDateTime');
const configuration = require('../src/utils/getConfiguration');
const { getDateTimeAttribute } = require('./test-utils/helperTestFunctions');

/******** MOCK CONFIG IMPORTS ********/
const config24Hour = require('./mocks/hour24');

/******** CONSTANTS ********/
const TEST_FILE_PATH = __dirname + '/index.test.html';

/******** LOCAL VARIABLES ********/
let dom, document, sandbox, spy, stub;

describe("24 Hour - Screen reader friendly dates:", function() {
    // create sandbox for testing
    before(() => {
        sandbox = sinon.createSandbox();
});

    /**
     * Ensure that the index.html test file is loaded for each
     * create a stub on getConfig
     * create a spy on parseDateTime
     */
    beforeEach(async function() {
        await JSDOM.fromFile(TEST_FILE_PATH).then(jsDom => {
            dom = jsDom;
        document = dom.window.document;
    });

        // stub = sandbox.stub(helperFunctions, "getConfig");
        stub = sandbox.stub(configuration, "getConfig");
        spy = sandbox.spy(parseDateTimeObj, "parseDateTime");
    });

    /**
     * resets the sandbox to ensure no carryover between tests
     */
    afterEach(() => {
        sandbox.restore(); // restore all fakes
});

    // READ OUT FOR TESTING SPECS
    console.log('Testing File Path:', TEST_FILE_PATH);


    /**
     * For full date and time labels such as 2022-05-02T11:30
     */
    describe("(24 hour format: 1-24 hr) Conversion to accessible labels", function () {
        /**
         * tests should be completed using the config set: default.json
         *  "locale": "en-US",
         *  "hourCycle": "h12",
         *  "hasWeekday": true
         */
        beforeEach(() => {
            const getConfig = function getConfig() {
                return config24Hour;
            };
            stub.value(getConfig);
        });

        it("converts numeric date and time to readable string for a time in the morning", function () {
            const testElm = getDateTimeAttribute("test-1", document);
            const parsedTest = parseDateTimeObj.parseDateTime(testElm);

            expect(parsedTest).to.be.a('string');
            expect(parsedTest).to.equal("Monday, May 2, 2022, 11:30");
        });


        it("converts numeric date and time to readable string for a time in the evening", function () {
            const testElm = getDateTimeAttribute("test-2", document);
            const parsedTest = parseDateTimeObj.parseDateTime(testElm);

            expect(parsedTest).to.be.a('string');
            expect(parsedTest).to.equal("Friday, February 9, 1990, 19:40");
        });


        it("converts numeric date only to readable string", function () {
            const testElm = getDateTimeAttribute("test-5", document);
            const parsedTest = parseDateTimeObj.parseDateTime(testElm);

            expect(parsedTest).to.be.a('string');
            expect(parsedTest).to.equal("Wednesday, May 3, 2023");
        });

        it("converts numeric time only to readable string for a time in the morning", function () {
            const testElm = getDateTimeAttribute("test-6", document);
            const parsedTest = parseDateTimeObj.parseDateTime(testElm);

            expect(parsedTest).to.be.a('string');
            expect(parsedTest).to.equal("11:30");
        });

        it("converts numeric time only to readable string for a time in the evening", function () {
            const testElm = getDateTimeAttribute("test-7", document);
            const parsedTest = parseDateTimeObj.parseDateTime(testElm);

            expect(parsedTest).to.be.a('string');
            expect(parsedTest).to.equal("19:30");
        });

        it("converts numeric time at midnight to start at 12", function() {
            const testElm = getDateTimeAttribute("test-3", document);
            const parsedTest = parseDateTimeObj.parseDateTime(testElm);

            expect(parsedTest).to.be.a('string');
            expect(parsedTest).to.equal("1:30");
        });

        it("converts numeric time at noon to start at 12", function() {
            const testElm = getDateTimeAttribute("test-4", document);
            const parsedTest = parseDateTimeObj.parseDateTime(testElm);

            expect(parsedTest).to.be.a('string');
            expect(parsedTest).to.equal("12:40");
        });

        it("converts numeric time at noon to start at 13", function() {
            const testElm = getDateTimeAttribute("test-13", document);
            const parsedTest = parseDateTimeObj.parseDateTime(testElm);

            expect(parsedTest).to.be.a('string');
            expect(parsedTest).to.equal("13:50");
        });

        it("converts numeric time near midnight to start at 23", function() {
            const testElm = getDateTimeAttribute("test-12", document);
            const parsedTest = parseDateTimeObj.parseDateTime(testElm);

            expect(parsedTest).to.be.a('string');
            expect(parsedTest).to.equal("23:59");
        });

        // it("converts numeric year only to readable string", function () {
        //     const testElm = getDateTimeAttribute("test-8", document);
        //     const parsedTest = parseDateTimeObj.parseDateTime(testElm);
        //
        //     expect(parsedTest).to.be.a('string');
        //     expect(parsedTest).to.equal("1999");
        // });
        //
        // it("converts numeric month only to readable string", function () {
        //     const testElm = getDateTimeAttribute("test-9", document);
        //     const parsedTest = parseDateTimeObj.parseDateTime(testElm);
        //
        //     expect(parsedTest).to.be.a('string');
        //     expect(parsedTest).to.equal("September");
        // });
        //
        // it("converts numeric month and day only to readable string", function () {
        //     const testElm = getDateTimeAttribute("test-10", document);
        //     const parsedTest = parseDateTimeObj.parseDateTime(testElm);
        //
        //     expect(parsedTest).to.be.a('string');
        //     expect(parsedTest).to.equal("September 19");
        // });
        //
        // it("converts numeric month and year only to readable string", function () {
        //     const testElm = getDateTimeAttribute("test-11", document);
        //     const parsedTest = parseDateTimeObj.parseDateTime(testElm);
        //
        //     expect(parsedTest).to.be.a('string');
        //     expect(parsedTest).to.equal("September 1998");
        // });
    });
});
