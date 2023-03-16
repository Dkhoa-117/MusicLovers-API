const jwt = require("jsonwebtoken");

module.exports = {
	generateToken: (_id, username) => {
		return jwt.sign({ _id, username }, process.env.JWT_SECRET, {
			expiresIn: "1d",
			algorithm: "HS256",
		});
	},
};
