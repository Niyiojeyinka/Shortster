const express = require("express");
const router = express.Router();
const useCor = require("../middlewares/cors");
const UrlCtrl = require("../controllers/UrlController");
const checkShortened = require("../middlewares/alreadyShortenedUrl");
const validateUrl = require("../middlewares/validateUrl");
const checkCodeNotExists = require("../middlewares/checkShortCodeExists");

router.post("/urls", useCor, checkShortened, validateUrl, UrlCtrl.create);
router.post(
  "/urls/:shortcode",
  useCor,
  checkCodeNotExists,
  checkShortened,
  validateUrl,
  UrlCtrl.create
);
router.get("/:shortcode/stats", useCor, UrlCtrl.getStats);
router.get("/:shortcode", UrlCtrl.redirect);

module.exports = router;
