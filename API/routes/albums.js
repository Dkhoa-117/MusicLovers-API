const router = require('express').Router();
const Album = require('../models/Album');
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
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({storage: storage, fileFilter: fileFilter});

//GET ALL ALBUMS
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums);
    }
    catch(err) {
        res.json({ message: err });
    }
});

//SUBMIT AN ALBUM
router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.file);
    try {
        const album = new Album({
            albumName: req.body.albumName,
            artistName: req.body.artistName,
            artistId: req.body.artistId,
            albumImg: req.file.path,
            genreId: req.body.genreId
        });
        const savedAlbum = await album.save();
        res.json(savedAlbum);
    }catch(err) {
        res.json({ message: err });
    }
});

//GET ALBUM - BY GENRE
router.get('/genre/:genreId', async (req, res) => {
    try{
        const album = await Album.find({
            genreId: req.params.genreId })
            .populate('genreId');
        res.json(album);
    }catch (err) {
        res.status(500).json({ err: "Something went wrong" });
    }
});

//GET ALBUM - BY ARTIST
router.get('/artist/:artistId', async (req, res) => {
    try{
        const album = await Album.find({
            artistId: req.params.artistId })
            .populate('artistId');
        res.json(album);
    }catch (err) {
        res.status(500).json({ err: "Something went wrong" });
    }
});

//GET A SPECIFIC ALBUM
router.get('/:albumId', async (req, res) => {
    try{
        const album = await Album.findById(req.params.albumId);
        res.json(album);
    }catch(err) {
        res.json({ message: err})
    }
});

//DELETE AN ALBUM
router.delete('/:albumId', async (req, res) => {
    try{
        const deleteAlbum = await Album.remove({_id: req.params.albumId});
        res.json(deleteAlbum);
    }catch(err) {
        res.json({ message: err});
    }
});

//UPDATE AN ALBUM - update genre
router.patch('/:albumId', async (req, res) => {
    try{
        const updateAlbum = await Album.updateOne({_id: req.params.albumId}, {$set: {genreId: req.body.genreId}});
        res.json(updateAlbum);
    }catch(err) {
        res.status().json({ message: err});
    }
});
module.exports = router;