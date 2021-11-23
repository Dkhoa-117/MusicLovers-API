const router = require('express').Router();
const User = require('../models/User');
const Playlist = require('../models/Playlist');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

//1. GET
//1.1. get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}).sort({ created_at: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ err: "Something went wrong" });
    }
});
//1.2. get specific user
router.get('/profile/:userId', async (req, res) => {
    try {
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
            throw new Error('User not found');
        }
    } catch (err) {
        res.status(500).json({ err: "Something went wrong" });
    }
});

//2. PATCH - upload avatar

//3. DELETE - delete user
router.delete('/:userId', async (req, res) => {
    try {
        const user = User.findById(req.params.userId);
        if (user) {
            await user.remove();
            res.json({ message: 'User removed' });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (err) {
        res.status(500).json({ err: "Something went wrong" });
    }
    const user = await User.findById(req.params.userId);
});

//4. POST
//4.1. login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
                create_at: user.create_at
            });
        } else {
            res.status(401).json('Invalid Email or Password!');
        }
    } catch (err) {
        res.status(500).json({ err: "Something went wrong" });
    }
});

//4.2. register
router.post('/', async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        } else {
            const user = await User.create({
                userName,
                email,
                password,
            });
            if (user) {
                const plist_liked = new Playlist({
                    playlistName: 'Liked Songs',
                    userId: user._id,
                    playlist_number: 0
                });
                plist_liked.save();
                const plist_recently = new Playlist({
                    playlistName: 'Recently Played',
                    userId: user._id,
                    playlist_number: 1

                });
                plist_recently.save();
                res.status(201).json({
                    _id: user._id,
                    userName: user.userName,
                    email: user.email,
                    avatar: user.avatar,
                    create_at: user.create_at
                });
            } else {
                res.status(400).json({ message: 'Invalid user data' });
            }
        }
    } catch (err) {
        res.status(500).json({ err: "something went wrong" });
    }
});
module.exports = router;