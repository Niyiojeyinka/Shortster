const shortCodeHelper = require("../helpers/shortcode");
const db = require("../models");
const url = require("../helpers/url");
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
        host: url.url(req),
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
  const url = await db.sequelize.query(
    "SELECT * FROM `Urls` WHERE BINARY `shortCode` = '" +
      req.params.shortcode +
      "' LIMIT 1",
    { type: db.sequelize.QueryTypes.SELECT }
  );
  if (!url[0]) {
    return res.status(404).json({
      name: "ShortCodeNotFound",
      message: "Short Code Not Found",
      data: {},
    });
  }
  try {
    const visits = await db.Visit.findAndCountAll({
      where: {
        shortCode: req.params.shortcode,
      },
    });

    return res.status(200).json({
      name: "success",
      message: "Data fetched successfully.",
      data: {
        created: url[0].createdAt,
        visits: visits.rows.slice(-10),
        novisits: visits.count,
        lastvisit: visits.rows[visits.count - 1].createdAt,
      },
    });
  } catch (e) {
    return res.status(200).json({
      name: "success",
      message: "Data fetched successfully.",
      data: {
        created: url[0].createdAt,
        visits: [],
        novisits: 0,
        lastvisit: null,
      },
    });
  }
};
/** redirect to corresponding link in the database
 *
 * @param {*} req
 * @param {*} res
 * @returns redirect/json
 */
exports.redirect = async (req, res) => {
  const url = await db.sequelize.query(
    "SELECT * FROM `Urls` WHERE BINARY `shortCode` = '" +
      req.params.shortcode +
      "' LIMIT 1",
    { type: db.sequelize.QueryTypes.SELECT }
  );

  //check record exists
  if (url[0]) {
    // record visit
    await db.Visit.create({
      shortCode: req.params.shortcode,
    });
    return res.redirect(
      307,
      url[0].url.indexOf("http") != -1 ? url[0].url : "https://" + url[0].url
    );
  } else {
    return res.status(404).json({
      name: "UrlNotFound",
      message: "URL not found",
    });
  }
};
