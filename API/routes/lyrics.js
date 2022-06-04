const router = require("express").Router();
const Lyrics = require("../models/Lyrics");
const Song = require("../models/Song");

//GET ALL GENRES
router.get("/", async (req, res) => {
	try {
		const genres = await Genre.find();
		res.json(genres);
	} catch (err) {
		res.json({ message: err });
	}
});

//CREATE A GENRE
router.post("/", async (req, res) => {
	const genre = new Genre({
		genreType: req.body.genreType,
	});
	try {
		const savedGenre = await genre.save();
		res.json(savedGenre);
	} catch (err) {
		res.json({ message: err });
	}
});

//GET A SPECIFIC GENRE
router.get("/:songId", async (req, res) => {
	try {
		const song = await Song.findById(req.params.songId);
		if (song) {
			const lyrics = await Lyrics.findOne({ songId: song._id });
			console.log(lyrics);
			res.json({ lyrics: lyrics.lyrics });
		} else {
		}
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

//UPDATE A GENRE - Genre type
router.patch("/:lyricsId", async (req, res) => {
	try {
		const updateGenre = await Genre.updateOne(
			{ _id: req.params.genreId },
			{ $set: { genreType: req.body.genreType } }
		);
		res.json(updateGenre);
	} catch (err) {
		res.status().json({ message: err });
	}
});

//DELETE A GENRE
router.delete("/:lyricsId", async (req, res) => {
	try {
		const deleteGenre = await Genre.remove({ _id: req.params.genreId });
		res.json(deleteGenre);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
