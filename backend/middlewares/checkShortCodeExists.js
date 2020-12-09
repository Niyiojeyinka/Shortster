const shortCodeHelper = require("../helpers/shortcode");
module.exports = async (req, res, next) => {
  const codeExists = await shortCodeHelper.checkShortCodeExists(
    req.params.shortcode
  );
  if (codeExists) {
    return res.status(400).json({
      name: "CodeExists",
      message: "Short code already exists",
      data: [],
    });
  } else {
    next();
  }
};
