const router = require("express").Router();
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");
const { upload } = require("../utils/upload-file");
const {
	search,
	getSongbyCategory,
	getAll,
	getSongbyID,
	getSongbyArtist,
	getSongbyAlbum,
	getSongbyGenre,
	likeSong,
	deleteSong,
	addArtist2Song,
	createSong,
} = require("../controllers/song");

//Search Song, using songName and artistName
router.get("/search", search);
//get songs by category
router.get("/category/:category", getSongbyCategory);

//GET ALL SONGS
router.get("/", getAll);

//GET A SPECIFIC SONG
router.get("/:songId", getSongbyID);

//GET SONGS - BY ARTIST
router.get("/artist/:artistId", getSongbyArtist);

//GET SONGS - BY ALBUM
router.get("/album/:albumId", getSongbyAlbum);

//GET SONGS - BY GENRE
router.get("/genre/:genreId", getSongbyGenre);

//SUBMIT A SONG
router.post(
	"/",
	upload.fields([
		{ name: "image", maxCount: 1 },
		{ name: "audio", maxCount: 1 },
	]),
	createSong
);

//ADD ARTIST TO THE SONG - a song has various of artists, do this to add some feature artists
router.post("/:songId/artist/:artistId", addArtist2Song);
router.post("/recent", async (req, res) => {
	//need to test
	try {
		const { userId } = req.body;
		const playlist_number = 1;
		const playlist = await Playlist.findOne({ userId, playlist_number });
		if (playlist) {
			const song = await Song.findById(req.body.songId);
			//const songlist = playlist.songId;
			if (song) {
				if (playlist.numSongs === 30) {
					playlist.songId.shift();
					playlist.songId.pop(song);
				} else {
					playlist.songId.push(song);
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
	} catch (err) {
		res.json({ message: err });
	}
});
//LIKE SONG - body: userId, songId
router.post("/likes", likeSong);

//DELETE A SONG
router.delete("/:songId", deleteSong);

module.exports = router;
