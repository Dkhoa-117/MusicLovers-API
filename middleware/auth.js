const { Unauthorized } = require("../errors");
const jwt = require("jsonwebtoken");
module.exports = {
	auth: (req, res, next) => {
		const authHeader = req.headers.authorization;
		if (!(authHeader && authHeader.startsWith("Bearer "))) {
			throw new Unauthorized("No token provided");
		}
		const token = authHeader.split(" ")[1];
		try {
			const decode = jwt.decode(token, process.env.JWT_SECRET);
			const { _id, username } = decode;
			req.user = { _id, username };
			next();
		} catch (err) {
			throw new Unauthorized("No authorized to access this route");
		}
	},
	authAdmin: (req, res, next) => {
		const { _id, username } = req.user;
		if (_id !== process.env.ADMIN_ID && username !== "admin") {
			throw new Unauthorized("No authorized to access this route");
		}
		next();
	},
};
