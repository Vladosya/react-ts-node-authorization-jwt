const ApiError = require('../exceptions/api-error.js');

module.exports = (err, req, res, next) => {
	if (err instanceof ApiError) { // если ошибка явл. инстансом этого класса
		return res.status(err.status).json({
			status: err.status,
			message: err.message,
			errors: err.errors
		})
	}
	return res.status(500).json({
		status: 500,
		message: "Произошла непредвиденная ошибка",
	})
}