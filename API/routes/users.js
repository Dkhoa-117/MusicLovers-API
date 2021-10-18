const router = require('express').Router();
const User = require('../models/User');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({storage: storage, fileFilter: fileFilter});

//1. GET
//1.1. get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}).sort({ created_at: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({err: "Something went wrong"});
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
    } catch(err) {
        res.status(500).json({err: "Something went wrong"});
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
    } catch(err) {
        res.status(500).json({err: "Something went wrong"});
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
            res.status(401);
            throw new Error('Invalid email or password');
        }
    }catch(err) {
        res.status(500).json({ err: "Something went wrong" });
    }
});

//4.2. register
router.post('/', async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }
        const user = await User.create({
            userName,
            email,
            password,
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
                create_at: user.create_at
            });
        }else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    }catch(err) {
        res.status(500).json({ message: err });
    }
});
module.exports = router;