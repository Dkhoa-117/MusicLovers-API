const asyncWrapper = require("../middleware/async");
const User = require("../models/User");
const Playlist = require("../models/Playlist");

module.exports = {
	getAll: asyncWrapper(async (req, res) => {
		const users = await User.find({}).sort({ created_at: -1 });
		res.json(users);
	}),
	getUserbyID: asyncWrapper(async (req, res) => {
		const user = await User.findById(req.params.userId);
		if (user) {
			res.json({
				_id: user._id,
				userName: user.userName,
				email: user.email,
				avatar: user.avatar,
			});
		} else {
			res.status(404);
			throw new Error("User not found");
		}
	}),
	deleteUser: asyncWrapper(async (req, res) => {
		const user = User.findById(req.params.userId);
		if (user) {
			await user.remove();
			res.json({ message: "User removed" });
		} else {
			res.status(404);
			throw new Error("User not found");
		}
	}),
	login: asyncWrapper(async (req, res) => {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (user && (await user.matchPassword(password))) {
			res.json({
				_id: user._id,
				userName: user.userName,
				email: user.email,
				avatar: user.avatar,
				create_at: user.create_at,
			});
		} else {
			res.status(401).json("Invalid Email or Password!");
		}
	}),
	register: asyncWrapper(async (req, res) => {
		const { userName, email, password } = req.body;
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		} else {
			const user = await User.create({
				userName,
				email,
				password,
			});
			if (user) {
				const plist_liked = new Playlist({
					playlistName: "Liked Songs",
					userId: user._id,
					playlist_number: 0,
					playlistImg: "uploads/default_playlist.jpeg",
				});
				plist_liked.save();
				const plist_recently = new Playlist({
					playlistName: "Recently Played",
					userId: user._id,
					playlist_number: 1,
					playlistImg: "uploads/default_playlist.jpeg",
				});
				plist_recently.save();
				res.status(201).json({
					_id: user._id,
					userName: user.userName,
					email: user.email,
					avatar: user.avatar,
					create_at: user.create_at,
				});
			} else {
				res.status(400).json({ message: "Invalid user data" });
			}
		}
	}),
};
