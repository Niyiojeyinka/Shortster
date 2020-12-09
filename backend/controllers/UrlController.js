const shortCodeHelper = require("../helpers/shortcode");
const db = require("../models");
/** create a shorten url
 *
 * @param {*} req
 * @param {*} res
 * @returns json
 */
exports.create = async (req, res) => {
  try {
    let shortcode = "";
    //check if have a parameter(shortcode)
    if (req.params.shortcode) {
      if (!shortCodeHelper.validateUserDefinedShortCode(req.params.shortcode)) {
        return res.status(400).json({
          name: "LengthTooSmall",
          message: "Shortcode must be longer or equal to 4",
          data: [],
        });
      }
    } else {
      //generate new code
      shortcode = await shortCodeHelper.generateShortCode();
    }

    await db.Url.create({
      url: req.body.url,
      shortCode: req.params.shortcode ? req.params.shortcode : shortcode,
    });

    return res.status(201).json({
      name: "Shortened",
      message: "code shortened successfuly.",
      data: {
        shortcode: shortcode,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
exports.getStats = (req, res) => {};
