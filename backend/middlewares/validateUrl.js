const urlHelper = require("../helpers/url");

module.exports = async (req, res, next) => {
  if (urlHelper.validateURL(req.body.url)) {
    next();
  } else {
    res.status(400).json({
      name: "InvalidUrl",
      message: "Invalid Url.",
    });
  }
};
