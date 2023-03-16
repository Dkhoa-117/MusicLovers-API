const Artist = require("../models/Artist");
const User = require("../models/User");
const asyncWrapper = require("../middleware/async");

module.exports = {
	getAll: asyncWrapper(async (req, res) => {
		const artists = await Artist.find();
		res.json(artists);
	}),
	search: asyncWrapper(async (req, res) => {
		const searchField = req.query.q;
		const albums = await Artist.find({
			artistName: { $regex: searchField, $options: "i" },
		});
		res.staus(200).json(albums);
	}),
	getArtistbyUser: asyncWrapper(async (req, res) => {
		const user = await User.findById(req.params.userId).populate("artistId");
		const temp = user.artistId;
		const artist = [];
		for (var item of temp) {
			artist.push({
				_id: item._id,
				artistName: item.artistName,
				description: item.description,
				artistImg: item.artistImg,
				liked: true,
			});
		}
		if (artist) {
			res.status(201).json(artist);
		} else {
			res.status(201).json({ message: "No Artist" });
		}
	}),
	getArtistbyUser: asyncWrapper(async (req, res) => {
		const artist = await Artist.findById(req.params.artistId);
		const user = await User.findById(req.params.userId);
		const artistList = user.artistId;
		if (artist) {
			const found = artistList.indexOf(artist._id);
			if (found === -1) {
				res.status(201).json({
					_id: artist._id,
					artistName: artist.artistName,
					description: artist.description,
					artistImg: artist.artistImg,
					liked: false,
				});
			} else {
				res.status(201).json({
					_id: artist._id,
					artistName: artist.artistName,
					description: artist.description,
					artistImg: artist.artistImg,
					liked: true,
				});
			}
		} else {
			res.status(404).json({ message: "Artist not found" });
			return;
		}
	}),
	likeArtist: asyncWrapper(async (req, res) => {
		const userId = req.body.userId;
		//const playlist_number = 0;
		const user = await User.findById(userId);
		if (user) {
			const artistId = req.body.artistId;
			const artist = await Artist.findById(artistId);
			const artistlist = user.artistId; //artist's id array
			if (artist) {
				const found = artistlist.indexOf(artist._id);
				if (found === -1 /* chua co */) {
					user.artistId.push(artistId);
					await user.save();
				} else {
					res.status(200).json({ message: "Unliked Artist" });
					user.artistId.remove(artistId);
					await user.save();
					return;
				}
			} else {
				res.status(404).json({ message: "Artist not found" });
				return;
			}
		} else {
			res.status(404).json({ message: "User not found" });
			return;
		}
		res.status(201).json({ message: "Liked Artist" });
	}),
	createArtist: asyncWrapper(async (req, res) => {
		const artist = new Artist({
			artistName: req.body.artistName,
			description: req.body.description,
			artistImg: req.file.path,
		});
		const savedArtist = await artist.save();
		res.json(savedArtist);
	}),
	updateArtist: asyncWrapper(async (req, res) => {
		const updateArtist = Artist.updateOne(
			{ _id: req.params.artistId },
			{ $set: { description: req.body.description } }
		);
		res.json(updateArtist);
	}),
	deleteArtist: asyncWrapper(async (req, res) => {
		const deleteArtist = await Artist.remove({ _id: req.params.artistId });
		res.json(deleteArtist);
	}),
};
