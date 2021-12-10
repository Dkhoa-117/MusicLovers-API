const router = require('express').Router();
const Artist = require('../models/Artist');
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
router.get('/:artistId', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.artistId);
        res.json(artist);
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