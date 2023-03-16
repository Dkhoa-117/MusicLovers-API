const router = require("express").Router();
const { upload } = require("../utils/upload-file");
const {
	getAll,
	getPlaylistbyID,
	getSongbyPlaylist,
	addSong2Playlist,
	getPlaylistbyUser,
	updatePlaylist,
	removeSong,
	deletePlaylist,
	createPlaylist,
} = require("../controllers/playlist");

//GET ALL PLAYLISTS
router.get("/", getAll);

//GET Playlist - populate song
router.get("/songs/:playlistId", getSongbyPlaylist);

//GET A SPECIFIC PLAYLIST
router.get("/:playlistId", getPlaylistbyID);

//GET PLAYLISTS - BY USER
router.get("/user/:userId", getPlaylistbyUser);

//GET PLAYLISTS - BY USER - playlist_number
router.get("/:userId/:playlist_number", async (req, res) => {
	try {
		const userId = req.params.userId;
		const playlist = await Playlist.find({
			userId: userId,
			playlist_number: req.params.playlist_number,
		});
		res.json(playlist);
	} catch (err) {
		res.status(500).json({ err: "Something went wrong" });
	}
});

//CREATE A PLAYLIST
router.post("/", upload.single("image"), createPlaylist);

//ADD A SONG TO PLAYLIST
router.post("/:playlistId/songs", addSong2Playlist);

//UPDATE A PLAYLIST
router.patch("/:playlistId/name", updatePlaylist);

//REMOVE A SONG IN PLAYLIST
router.delete("/:playlistId/songs/:songId", removeSong);

//DELETE A PLAYLIST
router.delete("/:playlistId", deletePlaylist);

module.exports = router;
