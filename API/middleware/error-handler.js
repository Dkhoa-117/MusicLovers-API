const { CustomAPIError } = require("../errors");
const StatusCodes = require("http-status-codes");

const errorHandler = (error, req, res, next) => {
	console.log(error);
	if (error instanceof CustomAPIError) {
		res.status(error.statusCode).json({ message: error.message });
	}
	res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.json({ message: "Something went wrong" });
};

module.exports = errorHandler;
