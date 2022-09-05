var express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");
const Message = require("../models/messages");

exports.writeMessage = function (req, res, next) {
	res.render("writeMessage");
};

exports.saveMessage = function (req, res, next) {
	const message = new Message({
		message: req.body.message_field,
		username: req.user.username,
		date: new Date(),
	});
	message.save(function (err) {
		if (err) {
			return next(err);
		}
		console.log(req);
		res.redirect("/");
	});
};
