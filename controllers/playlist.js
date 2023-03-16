const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const asyncWrapper = require("../middleware/async");

module.exports = {
	getAll: asyncWrapper(async (req, res) => {
		const playlists = await Playlist.find();
		res.status(200).json(playlists);
	}),
	getSongbyPlaylist: asyncWrapper(async (req, res) => {
		const playlist = await Playlist.findById(req.params.playlistId).populate(
			"songId"
		);
		const song = playlist.songId;
		res.status(200).json(song);
	}),
	getPlaylistbyID: asyncWrapper(async (req, res) => {
		const playlist = await Playlist.findById({ _id: req.params.playlistId });
		res.status(200).json(playlist);
	}),
	getPlaylistbyUser: asyncWrapper(async (req, res) => {
		const playlist = await Playlist.find({
			userId: req.params.userId,
		});
		res.status(200).json(playlist);
	}),
	createPlaylist: asyncWrapper(async (req, res) => {}),
	addSong2Playlist: asyncWrapper(async (req, res) => {
		const playlist = await Playlist.findById(req.params.playlistId);
		if (playlist) {
			const song = await Song.findById(req.body.songId);
			const songlist = playlist.songId;
			if (song) {
				const found = songlist.indexOf(song._id);
				if (found === -1) {
					playlist.songId.push(song);
				} else {
					res.status(201).json({ message: "Song aldready exists" });
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
		res.status(200).json({ message: "Song added" });
	}),
	createPlaylist: asyncWrapper(async (req, res) => {
		if (req.file !== undefined) {
			res.json({ message: "no file" });
			console.log("some");
			return;
		}
		const playlist = new Playlist({
			playlistName: req.body.playlistName,
			userId: req.body.userId,
			playlist_number: 2,
		});
		await playlist.save();
		res.status(200).json(playlist);
	}),
	updatePlaylist: asyncWrapper(async (req, res) => {
		const updatePlaylist = await Playlist.updateOne(
			{ _id: req.params.playlistId },
			{ $set: { playlistName: req.body.playlistName } }
		);
		res.json(updatePlaylist);
	}),
	removeSong: asyncWrapper(async (req, res) => {
		const playlist = await Playlist.findById(req.params.playlistId);
		//const song = await Song.findById(req.params.songId);
		await playlist.songId.remove(req.params.songId);
		playlist.numSongs = playlist.songId.length;
		await playlist.save();
		res.status(201).json("Song removed!");
	}),
	deletePlaylist: asyncWrapper(async (req, res) => {
		const playlist = Playlist.findById(req.params.playlistId);
		if (playlist) {
			if (playlist.playlist_number !== 1 || playlist.playlist_number !== 0) {
				playlist.remove({ _id: req.params.playlistId });
			}
			res.status(200).json({ message: "Playlist Deleted" });
		}
	}),
};
