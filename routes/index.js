var express = require("express");
var router = express.Router();
const login_controller = require("../controllers/loginController");

/* GET home page. */
router.get("/", login_controller.checkAuthenticated, login_controller.loadHome);

// get signup page
router.get("/register", login_controller.loadRegistration);

// grab data from submitted registration
router.post(
	"/register",
	login_controller.passwordValidation,
	login_controller.submitRegistration
);

// get login page
router.get(
	"/login",
	login_controller.checkNotAuthenticated,
	login_controller.loadLogin
);

router.post(
	"/login",
	login_controller.checkNotAuthenticated,
	login_controller.loginAuthentication
);

module.exports = router;
