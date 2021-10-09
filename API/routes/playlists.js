const router = require('express').Router();
const Playlist = require('../models/Playlist');
const Song = require('../models/Song');
const multer = require('multer');

//Configure stored file
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'audio/mpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({storage: storage, fileFilter: fileFilter});

//GET ALL PLAYLISTS
router.get('/', async (req, res) => {
    try {
        const playlists = await Playlist.find();
        res.json(playlists);
    }
    catch(err) {
        res.json({ message: err });
    }
});

//GET PLAYLISTS - BY USER
router.get('/user/:userId', async (req, res) => {
    try{
        const playlist = await Playlist.find({
            userId: req.params.userId })
            .populate('userId');
        res.json(playlist);
    }catch (err) {
        res.status(500).json({ err: "Something went wrong" });
    }
});

//GET A SPECIFIC PLAYLIST
router.get('/:playlistId', async (req, res) => {
    try{
        const playlist = await Playlist.findById(req.params.playlistId);
        res.json(playlist);
    }catch(err) {
        res.json({ message: err })
    }
});

//CREATE A PLAYLIST
router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.file);
    const playlist = new Playlist({
        playlistName: req.body.playlistName,
        userId: req.body.userId,
        playlistImg: req.file.path
    });
    try {
        const savedPlaylist = await playlist.save();
        res.json(savedPlaylist);
    }catch(err) {
        res.json({ message: err });
    }
});

//DELETE A PLAYLIST
router.delete('/:playlistId', async (req, res) => {
    try{
        const deletePlaylist = await Playlist.remove({_id: req.params.playlistId});
        res.json(deletePlaylist);
    }catch(err) {
        res.json({ message: err});
    }
});

//ADD A SONG TO PLAYLIST
router.post('/:playlistId/songs/:songId', async (req, res) => {
    try{
        const playlist = await Playlist.findById(req.params.playlistId);
        if(playlist){
            const song = await Song.findById(req.params.songId);
            if(song){
                playlist.songs.push(song);
            }
            else{
                res.status(404);
                throw new Error('Song not found');
            }
        }
        else{
            res.status(404);
            throw new Error('Playlist not found');
        }
        playlist.numSongs = playlist.songs.length;
        await playlist.save();
        res.status(201).json({ message: 'Song added'});
    }catch(err){
        res.json({ message: err })
    }
});

//REMOVE A SONG IN PLAYLIST
router.delete('/:playlistId/songs/:songId', async (req, res) => {
    try{
        const playlist = await Playlist.findById(req.params.playlistId);
        const song = await Song.findById(req.params.songId);
        playlist.songs.remove(song);
        playlist.numSongs = playlist.songs.length;
        await playlist.save();
        res.status(201).json({message: 'Song removed!'});
    }catch(err){
        res.json({ message: err })
    }
});

//UPDATE A PLAYLIST
router.patch('/:playlistId/name', async (req, res) => {
    try{
        const updatePlaylist = await Playlist.updateOne({_id: req.params.playlistId}, {$set: {playlistName: req.body.playlistName}});
        res.json(updatePlaylist);
    }catch(err) {
        res.status().json({ message: err});
    }
});
module.exports = router;