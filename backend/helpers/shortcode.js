const db = require("../models");

/** Helps Generate unique a 6 digit shortcode
 *
 * @returns string of 6 digits
 */
exports.generateShortCode = async function () {
  availChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < 6; i++) {
    let randomPositon = Math.floor(Math.random() * availChars.length);
    randomString += availChars.substring(randomPositon, randomPositon + 1);
  }

  // return randomString;

  try {
    const url = await db.Url.findOne({
      where: {
        shortCode: randomString,
      },
    });

    if (url) {
      //shortcode exists retry
      return generateShortCode();
    } else {
      return randomString;
    }
  } catch (e) {
    return e;
  }
};

/** validate if user defined input greater 4
 *  @params String
 * @returns Boolean True or False
 */

exports.validateUserDefinedShortCode = function (text) {
  return text.length < 4 ? false : true;
};

/** Check if shortcode already exist or not
 *
 * @param {*} shortcode
 * @returns {Boolean} true if exist and false if not
 */

exports.checkShortCodeExists = async function (shortcode) {
  try {
    const url = await db.sequelize.query(
      "SELECT * FROM `Urls` WHERE BINARY `shortCode` = '" +
        shortcode +
        "' LIMIT 1",
      { type: db.sequelize.QueryTypes.SELECT }
    );
    console.log("Hey look here...." + url);
    return url[0].shortCode ? true : false;
  } catch (e) {
    return false;
  }
};
