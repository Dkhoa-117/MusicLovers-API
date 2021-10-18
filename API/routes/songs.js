const router = require('express').Router();
const Song = require('../models/Song');
const Artist = require('../models/Artist');
const multer = require('multer');

//Configure stored file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'audio/mpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

//GET ALL SONGS
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    }
    catch (err) {
        res.json({ message: err });
    }
});

//GET A SPECIFIC SONG
router.get('/:songId', async (req, res) => {
    try {
        const song = await Song.findById(req.params.songId);
        res.json(song);
    } catch (err) {
        res.json({ message: err })
    }
});

//GET SONGS - BY ARTIST
router.get('/artist/:artistId', async (req, res) => {
    try {
        const song = await Song.find({
            artistId: req.params.artistId
        });
        res.json(song);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

//GET SONGS - BY ALBUM
router.get('/album/:albumId', async (req, res) => {
    try {
        const song = await Song.find({
            albumId: req.params.albumId
        });
        res.json(song);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

//GET SONGS - BY GENRE 
router.get('/genre/:genreId', async (req, res) => {
    try {
        const song = await Song.find({
            genreId: req.params.genreId
        });
        res.json(song);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

//SUBMIT A SONG
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), async (req, res) => {
    console.log(req.files);
    try {
        const song = new Song({
            songName: req.body.songName,
            artistName: req.body.artistName,
            artistId: req.body.artistId,
            albumId: req.body.albumId,
            genreId: req.body.genreId,
            songImg: req.files['image'][0].path,
            songSrc: req.files['audio'][0].path
        });
        const savedSong = await song.save();
        res.json(savedSong);
    } catch (err) {
        res.json({ message: err });
    }
});

//ADD ARTIST TO THE SONG - a song has various of artists, do this to add some feature artists
router.post('/:songId/artist/:artistId', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.artistId);
        const song = await Song.findById(req.params.songId);
        if (song) {
            if (artist) {
                song.artistId.push(artist);
            }
            else {
                res.status(404);
                throw new Error('Artist not found');
            }
        }
        else {
            res.status(404);
            throw new Error('Song not found');
        }
        song.save();
        res.status(201).json({ message: 'Artist added' });
    } catch (err) {
        res.json({ message: err })
    }
});

//UPDATE SONG's LIKEs - count number of likes
router.patch('/:songId/likes', async (req, res) => {
    try {
        const updateSong = await Song.updateOne({ _id: req.params.songId }, { $set: { likeCount: req.body.likeCount } });
        res.json(updateSong);
    } catch (err) {
        res.status().json({ message: err });
    }
});

//DELETE A SONG
router.delete('/:songId', async (req, res) => {
    try {
        const deleteSong = await Song.remove({ _id: req.params.songId });
        res.json(deleteSong);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
