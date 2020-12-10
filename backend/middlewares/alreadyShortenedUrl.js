const db = require("../models");
const urlhelper = require("../helpers/url");

module.exports = async (req, res, next) => {
  try {
    const url = await db.Url.findOne({
      where: {
        url: req.body.url,
      },
    });
    if (!url) {
      next();
    } else {
      res.status(201).json({
        name: "Shortened",
        host: urlhelper.url(req),
        message: "code shortened Already.",
        data: {
          shortcode: url.shortCode,
        },
      });
    }
  } catch (e) {
    res.status(500).json({
      name: "InternalServerError",
      message: "Unknown Error Occured ,Please try again.",
      error: e,
    });
  }
};
