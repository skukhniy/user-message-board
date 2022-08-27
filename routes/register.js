var express = require("express");
const bcrypt = require("bcrypt");
var router = express.Router();

// get signup page
router.get("/", function (req, res, next) {
	res.render("register");
});

// grab data from submitted registration
router.post("/", async (req, res) => {
	try {
		console.log("trying bycrpt");
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		console.log({ username: req.body.username, password: hashedPassword });
		res.redirect("/");
	} catch (error) {
		console.log("bycrypt failed :(");
		console.error(error);
		res.redirect("/register");
	}
});

module.exports = router;
