const urlHelper = require("../helpers/url");
const shortCodeHelper = require("../helpers/shortcode");
const db = require("../models");

describe("url helper functions tests", () => {
  test("test valid url returns True", (done) => {
    expect(
      urlHelper.validateURL("https://github.com/niyiojeyinka")
    ).toBeTruthy();
    done();
  });

  test("test invalid url returns False", (done) => {
    expect(urlHelper.validateURL("invalid/gh")).toBeFalsy();
    done();
  });
});

describe("shortcode functions tests", () => {
  test("validate autoshortcode is 6 long chars ", async (done) => {
    const uniqueShortCode = await shortCodeHelper.generateShortCode();
    expect(uniqueShortCode.length).toEqual(6);
    done();
  });
  test("validate shortcode is unique", async (done) => {
    await db.Url.create({
      url: "https://google.com.ng",
      shortCode: "existing",
    });
    let res = await shortCodeHelper.checkShortCodeExists("existing");
    expect(res).toBeTruthy();
    res = await shortCodeHelper.checkShortCodeExists("notexists");
    expect(res).toBeFalsy();
    done();
  });

  test("validate user defined shortcode greater than 4 or equal 4", (done) => {
    expect(
      shortCodeHelper.validateUserDefinedShortCode("defined")
    ).toBeTruthy();
    expect(shortCodeHelper.validateUserDefinedShortCode("de")).toBeFalsy();
    done();
  });
});
