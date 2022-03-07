const Router = require('express');
const { body } = require('express-validator');

const UserController = require('../controllers/user-controller.js');
const authMiddleware = require("../middleware/auth-middleware.js");

const router = new Router();

router.post("/registration",
	body("email")
		.isEmail(),
	body("password")
		.isLength({ min: 8 })
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
		),
	UserController.registration
);
router.post("/login",
	body("email")
		.isEmail(),
	body("password")
		.isLength({ min: 8 })
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
		),
	UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", authMiddleware, UserController.getUsers);

module.exports = router;