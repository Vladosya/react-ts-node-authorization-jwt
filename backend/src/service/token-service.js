const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model.js");

require("dotenv/config");

class TokenService {
	async generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "60m" }); // генерируем токен access
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" }); // генерируем токен refresh

		return {
			accessToken,
			refreshToken
		}
	}

	async validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

			return userData;
		} catch (error) {
			return null;
		}
	}

	async validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

			return userData;
		} catch (error) {
			return null;
		}
	}

	async findToken(refreshToken) {
		const tokenData = await tokenModel.findOne({ refreshToken });

		return tokenData;
	}

	async saveToken(userId, refreshToken) {
		const tokenData = await tokenModel.findOne({ user: userId });
		if (tokenData) { // если токен есть у пользователя, то мы будем перезаписывать его с помощью refreshToken
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		// если токена нет у пользователя, то мы создаём его и возвращаем
		const token = await tokenModel.create({ user: userId, refreshToken });

		return token;
	}

	async removeToken(refreshToken) {
		const tokenData = await tokenModel.deleteOne({ refreshToken });

		return tokenData;
	}
}

module.exports = new TokenService();