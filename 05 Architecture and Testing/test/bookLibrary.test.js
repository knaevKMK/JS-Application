const { chromium } = require('playwright-chromium');
const expect = require('chai').expect;

let browser, page;
describe('test_BookLibtaty', function() {
    this.timeout(6000);
    before(async() => { browser = await chromium.launch() });
    after(async() => { await browser.close() });
    beforeEach(async() => { page = await browser.newPage() });
    afterEach(async() => { await page.close() });


    describe('test elements', async() => {
        beforeEach(async function() {
            await page.goto('http://127.0.0.1:5500/02.Book-Library/');
            await page.waitForSelector('table');
            await page.click('#loadBooks');
        })

        it('load books from library', async() => {
            const books = await page.$eval('tbody', book => book.innerText);
            // [
            //     'Harry Potter and the Philosopher\'s Stone\tJ.K.Rowling\tEdit Delete',
            //     'C# Fundamentals\tSvetlin Nakov\tEdit Delete'
            // ].forEach(book => expect(books.includes(book)).true);
            expect(books.includes('C# Fundamentals\tSvetlin Nakov\tEdit Delete')).true
        })

        it('test add new book', async() => {
            await page.fill('#createForm > input[name="title"]', 'C# Fundamentals');
            await page.fill('#createForm > input[name="author"]', 'Svetlin Nakov');
            await page.click('#createForm > button');
            await page.click('#loadBooks');

            const books = await page.$eval('tbody > tr:last-child', book => book.innerText);
            expect(books.trim().replace(/\s+/g, ':')).to.be.equal('C#:Fundamentals:Svetlin:Nakov:Edit:Delete');
        })

        it('edit book', async() => {

            await page.waitForSelector('.editBtn');
            await page.click('.editBtn');

            await page.fill('#editForm > input[name="title"]', 'Edited');
            await page.fill('#editForm > input[name="author"]', 'Knev');
            await page.click('#editForm > button')

            await page.click('#loadBooks');
            const books = await page.$eval('tbody > tr', book => book.innerText);
            expect(books.trim().replace(/\s+/g, ':')).to.be.equal('Edited:Knev:Edit:Delete');
        })


        it('delete first book if accept', async() => {
                const books = await page.$eval('tbody', book => book.innerText);
                let length = books.split('\n').length;
                await page.click('.deleteBtn');
                await page.click('text=OK');
                await page.click('#loadBooks');

                const afterOp = await page.$eval('tbody', book => book.innerText);
                let lengthAfter = afterOp.split('\n').length;

                expect(length - 1).to.be.equal(lengthAfter);

            })
            // it('delete first book if decline', async() => {
            //     await page.click('.deleteBtn');
            //     await page.click('text=Cancel');
            //     await page.click('#loadBooks');
            //     const afterOp = await page.$eval('tbody', book => book.innerText);
            //     let lengthAfter = afterOp.split('\n').length;

        //     expect(length).to.be.equal(lengthAfter);

        // })

    })

})