const expect = require('chai').expect;
const { chromium } = require('playwright-chromium')

let browser, page;

describe('E22 tests', function() {
    this.timeout(6000);
    before(async() => { browser = await chromium.launch() });
    after(async() => { await browser.close() });
    beforeEach(async() => page = await browser.newPage());
    afterEach(async() => { await page.close() });

    describe('test meassnger', async() => {
        it('test msg showing', async() => {
            await page.goto('http://127.0.0.1:5500/05%20Architecture%20and%20Testing/01.Messenger');
            await page.waitForSelector('textarea');
            await page.click('text=Refresh');
            const msgs = await page.$$eval('textarea', (_msgs) => _msgs.textContent);

            ["Spami: Hello, are you there?",
                "Garry: Yep, whats up :?",
                'Spami: How are you? Long time no see? :)',
                'George: Hello, guys! :))',
                'Spami: Hello, George nice to see you! :)))'
            ].forEach(msg => console.log(msgs)); //expect(msgs).to.contains(msg));
        })


    })

})