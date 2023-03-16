const router = require("express").Router();
const { upload } = require("../utils/upload-file");
const {
	getAll,
	search,
	getAlbumbyID,
	getAlbumbyCategory,
	getAlbumbyGenre,
	getAlbumbyArtist,
	createAlbum,
	updateAlbum,
	deleteAlbum,
} = require("../controllers/album");

//Search Albums
router.get("/search", search);

//GET ALBUMS BY CATEGORY
router.get("/category/:category", getAlbumbyCategory);

//GET A SPECIFIC ALBUM
router.get("/:albumId", getAlbumbyID);

//GET ALL ALBUMS
router.get("/", getAll);

//GET ALBUM - BY GENRE
router.get("/genre/:genreId", getAlbumbyGenre);

//GET ALBUM - BY ARTIST
router.get("/artist/:artistId", getAlbumbyArtist);

//CREATE AN ALBUM
router.post("/", upload.single("image"), createAlbum);

//UPDATE AN ALBUM - update genre
router.patch("/:albumId", updateAlbum);

//DELETE AN ALBUM
router.delete("/:albumId", deleteAlbum);

module.exports = router;
