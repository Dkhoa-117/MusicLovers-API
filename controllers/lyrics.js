const Lyrics = require("../models/Lyrics");
const Song = require("../models/Song");
const asyncWrapper = require("../middleware/async");

module.exports = {
	getAll: asyncWrapper(async (req, res) => {
		const genres = await Genre.find();
		res.status(200).json(genres);
	}),
	createLyrics: asyncWrapper(async (req, res) => {
		const genre = new Genre({
			genreType: req.body.genreType,
		});
		const savedGenre = await genre.save();
		res.status(201).json(savedGenre);
	}),
	getLyricsbyID: asyncWrapper(async (req, res) => {
		const song = await Song.findById(req.params.songId);
		if (song) {
			const lyrics = await Lyrics.findOne({ songId: song._id });
			let response = {
				lyrics: lyrics.lyrics,
				time: lyrics.time,
			};
			console.log(response);

			res.status(200).json(response);
		} else {
		}
	}),
	updateLyrics: asyncWrapper(async (req, res) => {
		const updateGenre = await Genre.updateOne(
			{ _id: req.params.genreId },
			{ $set: { genreType: req.body.genreType } }
		);
		res.status(200).json(updateGenre);
	}),
	deleteLyrics: asyncWrapper(async (req, res) => {
		const deleteGenre = await Genre.remove({ _id: req.params.genreId });
		res.status(200).json(deleteGenre);
	}),
};
