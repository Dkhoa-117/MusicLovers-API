const router = require('express').Router();
const Playlist = require('../models/Playlist');
const Song = require('../models/Song');
const multer = require('multer');
const { route } = require('./songs');

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

//GET ALL PLAYLISTS
router.get('/', async (req, res) => {
    try {
        const playlists = await Playlist.find();
        res.json(playlists);
    }
    catch (err) {
        res.json({ message: err });
    }
});

//GET Playlist - populate song
router.get('/songs/:playlistId', async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.playlistId).populate('songId');
        const song = playlist.songId;
        res.json(song);
    } catch (err) {
        res.status(500).json("Something went wrong");
    }
});

//GET A SPECIFIC PLAYLIST
router.get('/:playlistId', async (req, res) => {
    try {
        const playlist = await Playlist.findById({ _id: req.params.playlistId });
        res.json(playlist);
    } catch (err) {
        res.json({ message: err })
    }
});

//GET PLAYLISTS - BY USER
router.get('/user/:userId', async (req, res) => {
    try {
        const playlist = await Playlist.find({
            userId: req.params.userId
        });
        res.json(playlist);
    } catch (err) {
        res.status(500).json("Something went wrong");
    }
});

//GET PLAYLISTS - BY USER - playlist_number
router.get('/:userId/:playlist_number', async (req, res) => {
    try {
        const userId = req.params.userId;
        const playlist = await Playlist.find({ userId: userId, playlist_number: req.params.playlist_number });
        res.json(playlist);
    } catch (err) {
        res.status(500).json({ err: "Something went wrong" });
    }
});

//CREATE A PLAYLIST
router.post('/', upload.single('image'), async (req, res) => {
    if (req.file !== undefined) {
        res.json({ message: 'no file' });
        console.log('some');
        return;
    }
    const playlist = new Playlist({
        playlistName: req.body.playlistName,
        userId: req.body.userId,
        playlist_number: 2,
    });
    try {
        await playlist.save();
        res.status(200).json(playlist);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

//ADD A SONG TO PLAYLIST
router.post('/:playlistId/songs', async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.playlistId);
        if (playlist) {
            const song = await Song.findById(req.body.songId);
            const songlist = playlist.songId;
            if (song) {
                const found = songlist.indexOf(song._id)
                if (found === -1) {
                    playlist.songId.push(song);
                } else {
                    res.status(201).json({ message: 'Song aldready exists' });
                    return;
                }
            }
            else {
                res.status(404).json({ message: 'Song not found' });
                return;
            }
        }
        else {
            res.status(404).json({ message: 'Playlist not found' });
            return;
        }
        playlist.numSongs = playlist.songId.length;
        await playlist.save();
        res.status(200).json({ message: 'Song added' });
    } catch (err) {
        res.json({ message: err });
    }
});


//UPDATE A PLAYLIST
router.patch('/:playlistId/name', async (req, res) => {
    try {
        const updatePlaylist = await Playlist.updateOne({ _id: req.params.playlistId }, { $set: { playlistName: req.body.playlistName } });
        res.json(updatePlaylist);
    } catch (err) {
        res.status().json({ message: err });
    }
});

//REMOVE A SONG IN PLAYLIST
router.delete('/:playlistId/songs/:songId', async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.playlistId);
        //const song = await Song.findById(req.params.songId);
        await playlist.songId.remove(req.params.songId);
        playlist.numSongs = playlist.songId.length;
        await playlist.save();
        res.status(201).json('Song removed!');
    } catch (err) {
        console.log({ error: err });
        res.status(500).json({ message: err });
    }
});

//DELETE A PLAYLIST
router.delete('/:playlistId', async (req, res) => {
    try {
        await Playlist.remove({ _id: req.params.playlistId });
        res.status(200).json({ message: 'Playlist Deleted' });
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;