const Album = require("../models/Album");
const asyncWrapper = require("../middleware/async");

module.exports = {
	getAll: asyncWrapper(async (req, res) => {
		const albums = await Album.find();
		res.json(albums);
	}),
	search: asyncWrapper(async (req, res) => {
		const searchField = req.query.q;
		const albums = await Album.find({
			$or: [
				{ albumName: { $regex: searchField, $options: "i" } },
				{ artistName: { $regex: searchField, $options: "i" } },
			],
		});
		res.status(200).json(albums);
	}),
	getAlbumbyCategory: asyncWrapper(async (req, res) => {
		if (req.params.category === "new-albums") {
			const albums = await Album.find().sort({ create_at: -1 }).limit(10);
			res.status(201).json(albums);
		} else if (req.params.category === "hot-albums") {
			const albums = await Album.find().sort({ create_at: -1 }).limit(10);
			res.status(201).json(albums);
		}
	}),
	getAlbumbyID: asyncWrapper(async (req, res) => {
		const album = await Album.findById(req.params.albumId);
		if (album) {
			res.status(200).json({
				_id: album._id,
				albumName: album.albumName,
				artistName: album.artistName,
				artistId: album.artistId,
				albumImg: album.albumImg,
				genreId: album.genreId,
			});
		} else {
			res.status(500).json({ message: err });
		}
	}),
	getAlbumbyGenre: asyncWrapper(async (req, res) => {
		const album = await Album.find({
			genreId: req.params.genreId,
		});
		res.status(200).json(album);
	}),
	getAlbumbyArtist: asyncWrapper(async (req, res) => {
		const album = await Album.find({
			artistId: req.params.artistId,
		});
		res.status(200).json(album);
	}),
	createAlbum: asyncWrapper(async (req, res) => {
		console.log(req.file);
		const album = new Album({
			albumName: req.body.albumName,
			artistName: req.body.artistName,
			artistId: req.body.artistId,
			albumImg: req.file.path,
			genreId: req.body.genreId,
		});
		const savedAlbum = await album.save();
		res.json(savedAlbum);
	}),
	updateAlbum: asyncWrapper(async (req, res) => {
		const updateAlbum = await Album.updateOne(
			{ _id: req.params.albumId },
			{ $set: { genreId: req.body.genreId } }
		);
		res.status(200).json(updateAlbum);
	}),
	deleteAlbum: asyncWrapper(async (req, res) => {
		const deleteAlbum = await Album.remove({ _id: req.params.albumId });
		res.status(200).json(deleteAlbum);
	}),
};
