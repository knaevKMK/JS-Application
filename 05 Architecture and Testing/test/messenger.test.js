const { chromium } = require(('playwright-chromium'));
const expect = require('chai').expect;

let browser, page;

describe('test_Messanger', function() {
    this.timeout(6000);
    before(async() => { browser = await chromium.launch() });
    after(async() => { await browser.close() });
    beforeEach(async() => { page = await browser.newPage() });
    afterEach(async() => { await page.close() });


    describe('test element ofs Messenger', async() => {

        beforeEach(async function() {
            await page.goto('http://127.0.0.1:5500/01.Messenger/');
            await page.waitForSelector('#controls');
        })
        it('test showed msgs', async() => {


            await page.click('#refresh');

            const messages = await page.$eval('#messages', msg => msg.value);


            ['Spami: Hello, are you there?',
                'Garry: Yep, whats up :?',
                'Spami: How are you? Long time no see? :)',
                'George: Hello, guys! :))',
                'Spami: Hello, George nice to see you! :)))'
            ].forEach(msg => expect(messages.includes(msg)).true);

        })


        it('test Add new msg', async() => {
            await page.fill('#author', 'Pesho');
            await page.fill('#content', 'Tosho, wtf');
            await page.click('#submit');
            await page.click('#refresh')

            const messages = await page.$eval('textarea', msg => msg.value);
            ['Spami: Hello, are you there?',
                'Garry: Yep, whats up :?',
                'Spami: How are you? Long time no see? :)',
                'George: Hello, guys! :))',
                'Spami: Hello, George nice to see you! :)))',
                'Pesho: Tosho, wtf'
            ].forEach(msg => expect(messages.includes(msg)).true);

        })
    })
})