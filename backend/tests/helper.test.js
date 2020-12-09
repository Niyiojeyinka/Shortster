const urlHelper = require("../helpers/url");
const shortCodeHelper = require("../helpers/shortcode");
const Url = require("../models/Url");

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
  test("validate autoshortcode is 6 long chars ", (done) => {
    expect(shortCodeHelper.generateShortCode().length).toEqual(6);
    done();
  });
  test("validate shortcode is unique", async (done) => {
    await Url.create({
      url: "https://google.com",
      shortCode: "exist",
    });
    expect(shortCodeHelper.checkShortCodeExists("exists")).toBeTruthy();
    expect(shortCodeHelper.checkShortCodeExists("notexists")).toBeFalsy();
    done();
  });

  test("validate user defined shortcode greater than 4", (done) => {
    expect(
      shortCodeHelper.validateUserDefinedShortCode("defined")
    ).toBeTruthy();
    expect(shortCodeHelper.validateUserDefinedShortCode("de")).toBeFalsy();
    done();
  });
});
