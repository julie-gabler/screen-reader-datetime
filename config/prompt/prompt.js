const prompts = require('prompts');
const { createConfigFile } = require('./buildConfigFile');
const { validateLocale } = require('./localeHelperFunctions');

const questions = [
    {
        style: "string",
        type: "text",
        name: "locale",
        message: "What locale do you want to use?",
        initial: 'en-US',
        validate: locale => validateLocale(locale)
    },
    {
        type: 'select',
        name: 'hourCycle',
        message: 'Pick your desired hour format a color',
        choices: [
            { title: 'Default for locale', description: 'Uses the default as set by the locale',  value: null },
            { title: 'Hour 12 format', description: '1-12, Midnight starts at 12:00 am',  value: 'h12' },
            { title: 'Hour 23 format', description: '0-23, Midnight starts at 0:00',  value: 'h23' },
            { title: 'Hour 11 format', description: '0 - 11, Midnight starts at 0:00 am', value: 'h11' },
            { title: 'Hour 24 format', description: '1-24, Midnight starts at 24:00',  value: 'h24' },
        ],
        initial: 0
    },
    {
        type: "confirm",
        name: "hasWeekday",
        message: "Do you want to contain weekdays (Monday, Tuesday, etc) in your date strings?",
        initial: true
    }
];

function getLocaleOptions() {

}

(async () => {
    const response = await prompts(questions).then(response => {
        createConfigFile(response);
    });
})();
