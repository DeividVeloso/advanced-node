const puppeteer = require("puppeteer");
const sessionFactory = require("./factories/sessionFactory");
const userFactory = require("./factories/userFactory");

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

test("We can lauch a browser and see if logo shows up", async () => {
  const text = await page.$eval("a.brand-logo", el => el.innerHTML);

  expect(text).toEqual("Blogster");
});

test("clicking login starts oauth flow", async () => {
  await page.click(".right a");

  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test("When log in, it should shows logout button", async () => {
  const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

  expect(text).toEqual("Logout");
});

const Page = require("puppeteer/lib/Page");

Page.prototype.login = async function() {
  const user = await userFactory();
  const { session, sig } = sessionFactory(user);

  await this.setCookie({ name: "session", value: session });
  await this.setCookie({ name: "session.sig", value: sig });
  await this.goto("localhost:3000");
  await this.waitFor('a[href="/auth/logout"]');
};
