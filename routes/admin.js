const route = require("express").Router();
const { authAdmin, auth } = require("../middleware/auth");

route.route("/songs").get(auth, authAdmin, (req, res, next) => {
	res.status(200).render("songs");
});

route.route("/artists").get(auth, authAdmin, (req, res, next) => {
	res.status(200).render("artists");
});
route.route("/albums").get(auth, authAdmin, (req, res, next) => {
	res.status(200).render("albums");
});
module.exports = route;
