const router = require('express').Router();
const Genre = require('../models/Genre');

//GET ALL GENRES
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    }
    catch(err) {
        res.json({ message: err });
    }
});

//SUBMIT A GENRE
router.post('/', async (req, res) => {
    const genre = new Genre({
        genreType: req.body.genreType
    });
    try {
        const savedGenre = await genre.save();
        res.json(savedGenre);
    }catch(err) {
        res.json({ message: err });
    }
});

//GET A SPECIFIC GENRE
router.get('/:genreId', async (req, res) => {
    try{
        const genre = await Genre.findById(req.params.genreId);
        res.json(genre);
    }catch(err) {
        res.json({ message: err})
    }
});

//DELETE A GENRE
router.delete('/:genreId', async (req, res) => {
    try{
        const deleteGenre = await Genre.remove({_id: req.params.genreId});
        res.json(deleteGenre);
    }catch(err) {
        res.json({ message: err});
    }
});

//UPDATE A GENRE - Genre type
router.patch('/:genreId', async (req, res) => {
    try{
        const updateGenre = await Genre.updateOne({_id: req.params.genreId}, {$set: {genreType: req.body.genreType}});
        res.json(updateGenre);
    }catch(err) {
        res.status().json({ message: err});
    }
});
module.exports = router;