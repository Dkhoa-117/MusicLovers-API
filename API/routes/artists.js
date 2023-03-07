const router = require("express").Router();
const { upload } = require("../utils/upload-file");
const {
	getArtistbyUser,
	getAll,
	search,
	likeArtist,
	updateArtist,
	deleteArtist,
	createArtist,
} = require("../controllers/artist");

//Search Albums
router.get("/search", search);

//GET ARTIST - BY USER
router.get("/user/:userId", getArtistbyUser);

//GET ALL ARTISTS
router.get("/", getAll);

//GET A SPECIFIC ARTIST
router.get("/:userId/:artistId", getArtistbyUser);

//CREATE AN ARTIST
router.post("/", upload.single("image"), createArtist);

router.post("/likes", likeArtist);

//PATCH - update artist description
router.patch("/:artistId", updateArtist);

//DELETE
router.delete("/:artistId", deleteArtist);

module.exports = router;
