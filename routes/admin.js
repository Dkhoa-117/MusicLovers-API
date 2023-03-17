const route = require("express").Router();
const auth = require("../middleware/auth");

route.route("/songs").get((req, res, next) => {
	res.status(200).render("songs");
});

route.route("/artists").get((req, res, next) => {
	res.status(200).render("artists");
});
route.route("/albums").get((req, res, next) => {
	res.status(200).render("albums");
});
module.exports = route;
