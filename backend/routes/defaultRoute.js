const express = require("express");
const router = express.Router();
const UrlCtrl = require("../controllers/UrlController");
const checkShortened = require("../middlewares/alreadyShortenedUrl");
const validateUrl = require("../middlewares/validateUrl");
const checkCodeNotExists = require("../middlewares/checkShortCodeExists");

router.post("/urls", checkShortened, validateUrl, UrlCtrl.create);
router.post(
  "/urls/:shortcode",

  checkCodeNotExists,
  checkShortened,
  validateUrl,
  UrlCtrl.create
);
router.get("/:shortcode/stats", UrlCtrl.getStats);
router.get("/:shortcode", UrlCtrl.redirect);

module.exports = router;
