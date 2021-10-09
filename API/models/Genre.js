const mongoose = require('mongoose');

const GenreSchema = mongoose.Schema({
    genreType: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Genre', GenreSchema);