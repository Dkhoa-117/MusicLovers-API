const Song = require("../models/Song");
const Playlist = require("../models/Playlist");
const Artist = require("../models/Artist");
const asyncWrapper = require("../middleware/async");

module.exports = {
	getAll: asyncWrapper(async (req, res) => {
		const songs = await Song.find();
		res.status(200).json(songs);
	}),
	search: asyncWrapper(async (req, res) => {
		const searchField = req.query.q;
		const songs = await Song.find({
			$or: [
				{ songName: { $regex: searchField, $options: "i" } },
				{ artistName: { $regex: searchField, $options: "i" } },
			],
		});
		res.status(200).json(songs);
	}),
	getSongbyCategory: asyncWrapper(async (req, res) => {
		if (req.params.category === "new-music") {
			const songs = await Song.find().sort({ create_at: -1 }).limit(10);
			res.status(200).json(songs);
		} else if (req.params.category === "best-new-songs") {
			const songs = await Song.find()
				.sort({ create_at: -1, likeCount: -1 })
				.limit(10);
			res.status(200).json(songs);
		}
	}),
	getSongbyID: asyncWrapper(async (req, res) => {
		const song = await Song.findById(req.params.songId);
		res.status(200).json(song);
	}),
	getSongbyArtist: asyncWrapper(async (req, res) => {
		const song = await Song.find({
			artistId: req.params.artistId,
		}).sort({ likeCount: -1 });
		res.status(200).json(song);
	}),
	getSongbyAlbum: asyncWrapper(async (req, res) => {
		const song = await Song.find({
			albumId: req.params.albumId,
		});
		res.status(200).json(song);
	}),
	getSongbyGenre: asyncWrapper(async (req, res) => {
		const song = await Song.find({
			genreId: req.params.genreId,
		});
		res.status(200).json(song);
	}),
	createSong: asyncWrapper(async (req, res) => {
		const song = new Song({
			songName: req.body.songName,
			artistName: req.body.artistName,
			artistId: req.body.artistId,
			albumId: req.body.albumId,
			genreId: req.body.genreId,
			songImg: req.files["image"][0].path,
			songSrc: req.files["audio"][0].path,
		});
		const savedSong = await song.save();
		res.json(savedSong);
	}),
	addArtist2Song: asyncWrapper(async (req, res) => {
		const artist = await Artist.findById(req.params.artistId);
		const song = await Song.findById(req.params.songId);
		if (song) {
			if (artist) {
				song.artistId.push(artist);
			} else {
				res.status(404);
				throw new Error("Artist not found");
			}
		} else {
			res.status(404);
			throw new Error("Song not found");
		}
		song.save();
		res.status(201).json({ message: "Artist added" });
	}),
	likeSong: asyncWrapper(async (req, res) => {
		const { userId } = req.body;
		const playlist_number = 0;
		const playlist = await Playlist.findOne({ userId, playlist_number });
		if (playlist) {
			const song = await Song.findById(req.body.songId);
			const songlist = playlist.songId; //song's id array
			if (song) {
				const found = songlist.indexOf(song._id);
				let likeCount = song.likeCount;
				if (found === -1 /* chua co */) {
					playlist.songId.push(song);
					likeCount = likeCount + 1;
					song.likeCount = likeCount;
					await song.save();
				} else {
					res.status(200).json({ message: "Song aldready exists" });
					playlist.songId.remove(song);
					playlist.numSongs = playlist.songId.length;
					likeCount = likeCount - 1;
					song.likeCount = likeCount;
					await song.save();
					await playlist.save();
					return;
				}
			} else {
				res.status(404).json({ message: "Song not found" });
				return;
			}
		} else {
			res.status(404).json({ message: "Playlist not found" });
			return;
		}
		playlist.numSongs = playlist.songId.length;
		await playlist.save();
		res.status(201).json({ message: "Song added" });
	}),
	deleteSong: asyncWrapper(async (req, res) => {
		const deleteSong = await Song.remove({ _id: req.params.songId });
		res.status(201).json(deleteSong);
	}),
};
