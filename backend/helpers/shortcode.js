const db = require("../models");

/** Helps Generate a 6 digit shortcode
 *
 * @returns string of 6 digits
 */
exports.generateShortCode = function () {
  availChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < 6; i++) {
    let randomPositon = Math.floor(Math.random() * availChars.length);
    randomString += availChars.substring(randomPositon, randomPositon + 1);
  }
  return randomString;
};

/** validate if user defined input greater 4
 *  @params String
 * @returns Boolean True or False
 */

exports.validateUserDefinedShortCode = function (text) {
  return text.length >= 4 ? true : false;
};

/** Check if shortcode already exist or not
 *
 * @param {*} shortcode
 * @returns {Boolean} true if exist and false if not
 */

exports.checkShortCodeExists = async function (shortcode) {
  try {
    const url = await db.Url.findOne({
      where: {
        shortCode: shortcode,
      },
    });
    return url ? true : false;
  } catch (e) {
    return false;
  }
};