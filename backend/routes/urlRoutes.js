const express = require("express");
const router = express.Router();
const useCor = require("../middlewares/cors");
const UrlCtrl = require("../controllers/UrlController");
const checkShortened = require("../middlewares/alreadyShortenedUrl");
const validateUrl = require("../middlewares/validateUrl");

router.post("/", useCor, checkShortened, validateUrl, UrlCtrl.create);
router.post("/:shortcode", useCor, checkShortened, validateUrl, UrlCtrl.create);

module.exports = router;
