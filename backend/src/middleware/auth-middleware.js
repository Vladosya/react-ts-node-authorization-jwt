const ApiError = require("../exceptions/api-error.js");
const tokenService = require("../service/token-service.js");

module.exports = async (req, res, next) => {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedError());
		}
		const accessToken = authorizationHeader.split(" ")[1];
		if (!accessToken) {
			return next(ApiError.UnauthorizedError());
		}
		const userData = await tokenService.validateAccessToken(accessToken);
		if (!userData) {
			return next(ApiError.UnauthorizedError());
		}

		req.user = userData;
		next();
	} catch (error) {
		return next(ApiError.UnauthorizedError());
	}
}

// middleware для проверки на логинизацию пользователя