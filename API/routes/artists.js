const router = require('express').Router();
const Artist = require('../models/Artist');
const User = require('../models/User');
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

//Search Albums
router.get('/search', async (req, res) => {
    try {
        const searchField = req.query.q;
        const albums = await Artist.find({ artistName: { $regex: searchField, $options: 'i' } });
        res.json(albums);
    }
    catch (err) {
        res.json({ messagse: err });
    }
});

//GET ARTIST - BY USER
router.get('/user/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('artistId');
        const temp = user.artistId;
        const artist = [];
        for (var item of temp) {
            artist.push({
                _id: item._id,
                artistName: item.artistName,
                description: item.description,
                artistImg: item.artistImg,
                liked: true
            });
        }
        if (artist) {
            res.status(201).json(artist);
        } else {
            res.status(201).json({ message: 'No Artist' });
        }
    } catch (err) {
        res.status(500).json('Something went wrong');
    }
});

//GET ALL ARTISTS
router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    }
    catch (err) {
        res.json({ message: err });
    }
});

//GET A SPECIFIC ARTIST
router.get('/:userId/:artistId', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.artistId);
        const user = await User.findById(req.params.userId);
        const artistList = user.artistId;
        if (artist) {
            const found = artistList.indexOf(artist._id)
            if (found === -1) {
                res.status(201).json({
                    _id: artist._id,
                    artistName: artist.artistName,
                    description: artist.description,
                    artistImg: artist.artistImg,
                    liked: false
                });
            } else {
                res.status(201).json({
                    _id: artist._id,
                    artistName: artist.artistName,
                    description: artist.description,
                    artistImg: artist.artistImg,
                    liked: true
                });
            }
        }
        else {
            res.status(404).json({ message: 'Artist not found' });
            return;
        }

    } catch (err) {
        res.json({ message: err });
    }
});

//CREATE AN ARTIST
router.post('/', upload.single('image'), async (req, res) => {
    const artist = new Artist({
        artistName: req.body.artistName,
        description: req.body.description,
        artistImg: req.file.path
    });
    try {
        const savedArtist = await artist.save();
        res.json(savedArtist);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/likes', async (req, res) => {
    try {
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
                    res.status(200).json({ message: 'Unliked Artist' });
                    user.artistId.remove(artistId);
                    await user.save();
                    return;
                }
            }
            else {
                res.status(404).json({ message: 'Artist not found' });
                return;
            }
        }
        else {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(201).json({ message: 'Liked Artist' });
    } catch (err) {
        res.json({ message: err });
    }
});

//PATCH - update artist description
router.patch('/:artistId', async (req, res) => {
    try {
        const updateArtist = Artist.updateOne({ _id: req.params.artistId }, { $set: { description: req.body.description } });
        res.json(updateArtist);
    } catch {
        res.json({ message: err });
    }
});

//DELETE
router.delete('/:artistId', async (req, res) => {
    try {
        const deleteArtist = await Artist.remove({ _id: req.params.artistId });
        res.json(deleteArtist);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;