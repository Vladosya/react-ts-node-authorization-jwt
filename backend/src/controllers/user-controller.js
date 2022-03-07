const { validationResult } = require("express-validator");

const User = require('../models/user-model.js');
const userService = require("../service/user-service.js");
const ApiError = require("../exceptions/api-error.js");

require("dotenv/config");

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
			}
			const { email, password } = req.body;
			const userData = await userService.registration(email, password);
			// maxAge - время жизни в куках
			// httpOnly - чтобы нельзя было изменять куку внутри браузера с помощью js
			// secure - если мы используем https
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}
	async login(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
			}
			const { email, password } = req.body
			const userData = await userService.login(email, password);
			res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}
	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie("refreshToken");
			return res.status(200).json(token);
		} catch (error) {
			next(error);
		}
	}
	async activate(req, res, next) {
		try {
			const activationLink = req.params.link; // достаём ссылку из params.link
			await userService.activate(activationLink);
			return res.redirect(process.env.NEED_URL_REDIRECT); // если всё норм, то сделаем редирект на frontend
		} catch (error) {
			next(error);
		}
	}
	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);
			res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}
	async getUsers(req, res, next) {
		try {
			const userData = await userService.getUsers();
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new UserController;