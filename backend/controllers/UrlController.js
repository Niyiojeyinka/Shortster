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
      shortcode = req.params.shortcode;
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

/** Stats Endpoint
 *
 *
 * @param {*} req
 * @param {*} res
 */
exports.getStats = async (req, res) => {
  const url = await db.Url.findOne({
    where: {
      shortCode: req.params.shortcode,
    },
  });
  if (!url.shortCode) {
    return res.status(404).json({
      name: "NotFound",
      message: "Short Code Not Found",
      data: {},
    });
  }
  const visits = await db.Visit.findAndCountAll({
    where: {
      shortCode: req.params.shortcode,
    },
  });

  return res.status(200).json({
    name: "success",
    message: "Data fetched successfully.",
    data: {
      created: url.createdAt,
      visits: visits.rows.slice(-10),
      novisits: visits.count,
      lastvisit: visits.rows[visits.count - 1].createdAt,
    },
  });
};
