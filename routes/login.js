var express = require("express");
var router = express.Router();

// get login page
router.get("/", function (req, res, next) {
	res.render("login");
});
module.exports = router;
