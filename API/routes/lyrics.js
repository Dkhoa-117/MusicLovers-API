const {
	getAll,
	createLyrics,
	getLyricsbyID,
	updateLyrics,
	deleteLyrics,
} = require("../controllers/lyrics");

const router = require("express").Router();

//GET ALL lyrics
router.get("/", getAll);

//CREATE A lyrics
router.post("/", createLyrics);

//GET A SPECIFIC Lyrics
router.get("/:songId", getLyricsbyID);

//UPDATE A Lyrics
router.patch("/:lyricsId", updateLyrics);

//DELETE A Lyrics
router.delete("/:lyricsId", deleteLyrics);

module.exports = router;
