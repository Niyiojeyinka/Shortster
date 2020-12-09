const express = require("express");
const router = express.Router();
const useCor = require("../middlewares/cors");
const UrlCtrl = require("../controllers/UrlController");
const checkShortened = require("../middlewares/alreadyShortenedUrl");
const validateUrl = require("../middlewares/validateUrl");
const checkCodeNotExists = require("../middlewares/checkShortCodeExists");

router.post("/", useCor, checkShortened, validateUrl, UrlCtrl.create);
router.post(
  "/:shortcode",
  useCor,
  checkCodeNotExists,
  checkShortened,
  validateUrl,
  UrlCtrl.create
);
router.post("/:shortcode/stats", useCor, UrlCtrl.create);

module.exports = router;
