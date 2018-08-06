const puppeteer = require("puppeteer");

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await browser.close();
});

test("Adds two numbers", () => {
  const sum = 1 + 2;

  expect(sum).toEqual(3);
});

test("We can lauch a browser and see if logo shows up", async () => {
  const text = await page.$eval("a.brand-logo", el => el.innerHTML);

  expect(text).toEqual("Blogster");
});

test('clicking login starts oauth flow', async () => {
  await page.click('.right a');

  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
})

test.only('When log in, it should shows logout button', async () => {
  const id = "5b27a1a0bd6c4016196c0de3"; //UserID
  const sessionObject = {
    passport: {
      user: id
    }
  };

  const Buffer = require('safe-buffer').Buffer;
  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString('base64'); //Session
  const Keygrip = require('keygrip');
  const keys = require('../config/keys');
  const keygrip = new Keygrip([keys.cookieKey]);
  const sig = keygrip.sign('session=' + sessionString); //Session.sig

  await page.setCookie({name: 'session', value: sessionString})
  await page.setCookie({name: 'session.sig', value: sig})

  await page.goto('localhost:3000')
})
