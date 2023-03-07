const router = require("express").Router();
const {
	deleteGenre,
	updateGenre,
	getSongbyGenre,
	createGenre,
	getAll,
} = require("../controllers/genre");

//GET ALL GENRES
router.get("/", getAll);

//CREATE A GENRE
router.post("/", createGenre);

//GET A SPECIFIC GENRE
router.get("/:genreId/:userId", getSongbyGenre);

//UPDATE A GENRE - Genre type
router.patch("/:genreId", updateGenre);

//DELETE A GENRE
router.delete("/:genreId", deleteGenre);

module.exports = router;
