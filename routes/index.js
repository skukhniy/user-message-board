var express = require("express");
const passport = require("passport");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index");
});

// get login page
router.get("/login", function (req, res, next) {
	res.render("login");
});

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
	})
);

module.exports = router;
