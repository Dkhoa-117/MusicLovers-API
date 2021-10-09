const mongoose = require('mongoose')

const AlbumSchema = mongoose.Schema({
    albumName: {
        type: String,
        required: true
    },
    artistName: {
        type: String,
        required: true
    },
    artistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    genreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    albumImg: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Album', AlbumSchema);