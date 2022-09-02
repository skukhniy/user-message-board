var express = require("express");
const bcrypt = require("bcrypt");
var router = express.Router();
// const User = require("../models/user");

const { check, validationResult } = require("express-validator");
const e = require("express");

// get signup page
router.get("/", function (req, res, next) {
	res.render("register");
});

//validators to check if same password was written down for confirmpass
const passwordValidation = [
	check("password", "please enter a password").exists(),
	check(
		"passwordConfirm",
		"Confirm Password field must have the same value as the password field"
	)
		.exists()
		.custom((value, { req }) => value === req.body.password),
];

// grab data from submitted registration
router.post("/", passwordValidation, async (req, res) => {
	try {
		var err = validationResult(req);
		if (!err.isEmpty()) {
			console.log("Registration: error w/ password");
			console.log(err.mapped());
			res.render("register", { errors: err.mapped().passwordConfirm });
		} else {
			console.log("trying bycrpt");
			// hash password
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			// var user = new User({
			// 	username: req.body.username,
			// 	password: hashedPassword,
			// });
			// user.save(function (err) {
			// 	if (err) {
			// 		return next(err);
			// 	}

			// 	// successful, then redirect to home page
			// 	res.redirect("/");
			// });

			console.log({ username: req.body.username, password: hashedPassword });
			res.redirect("/");
		}
	} catch (error) {
		console.log("bycrypt failed :(");
		console.error(error);
		res.redirect("/register");
	}
});

module.exports = router;
// app.post(
//   '/create-user',
//   check('password').exists(),
//   check(
//     'passwordConfirmation',
//     'passwordConfirmation field must have the same value as the password field',
//   )
//     .exists()
//     .custom((value, { req }) => value === req.body.password),
//   loginHandler,
// );
