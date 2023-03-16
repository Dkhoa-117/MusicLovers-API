const Genre = require("../models/Genre");
const Playlist = require("../models/Playlist");
const asyncWrapper = require("../middleware/async");
module.exports = {
	getAll: asyncWrapper(async (req, res) => {
		const genres = await Genre.find();
		res.json(genres);
	}),
	createGenre: asyncWrapper(async (req, res) => {
		const genre = new Genre({
			genreType: req.body.genreType,
		});
		const savedGenre = await genre.save();
		res.json(savedGenre);
	}),
	getSongbyGenre: asyncWrapper(async (req, res) => {
		const genre = await Genre.findById(req.params.genreId);
		const playlist = await Playlist.findOne({
			userId: req.params.userId,
			playlist_number: 0,
		}).populate("songId");
		const songs = [];
		for (var song of playlist.songId) {
			if (song.genreId.equals(genre._id)) {
				songs.push(song);
			}
		}
		if (songs) {
			res.status(201).json(songs);
		} else {
			res.status(201).json({ message: "No Song Found" });
		}
	}),
	updateGenre: asyncWrapper(async (req, res) => {
		const updateGenre = await Genre.updateOne(
			{ _id: req.params.genreId },
			{ $set: { genreType: req.body.genreType } }
		);
		res.json(updateGenre);
	}),
	deleteGenre: asyncWrapper(async (req, res) => {
		const deleteGenre = await Genre.remove({ _id: req.params.genreId });
		res.json(deleteGenre);
	}),
};
