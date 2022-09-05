var express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Message = require("../models/messages");
const passport = require("passport");

const { check, validationResult } = require("express-validator");

exports.checkAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		console.log("is authenticated");
		return next();
	}
	console.log("user is not authenticated");
	res.redirect("/login");
};

exports.checkNotAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		console.log("user is authenticated");
		res.redirect("/");
	}
	console.log("user is not authenticated");
	next();
};

exports.loadHome = function (req, res, next) {
	Message.find({}).exec((err, list_messages) => {
		if (err) {
			res.render("userHome");
			return next(err);
		}
		res.render("userHome", { messages: list_messages });
	});
};

//validators to check if same password was written down for confirmpass
exports.passwordValidation = [
	check("password", "please enter a password").exists(),
	check(
		"passwordConfirm",
		"Confirm Password field must have the same value as the password field"
	)
		.exists()
		.custom((value, { req }) => value === req.body.password),
];

exports.loadRegistration = function (req, res, next) {
	res.render("register");
};

exports.submitRegistration = async (req, res) => {
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
			// model schema
			var Users = new User({
				username: req.body.username,
				password: hashedPassword,
			});
			// saves user to the DB
			Users.save(function (err) {
				if (err) {
					return next(err);
				}

				// successful, then redirect to home page
				res.redirect("/");
			});
		}
	} catch (error) {
		console.log("bycrypt failed :(");
		console.error(error);
		res.redirect("/register");
	}
};

exports.loadLogin = function (req, res, next) {
	res.render("login");
};

exports.loginAuthentication = passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login",
});

exports.logout = (req, res) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
};
