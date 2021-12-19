const mongoose = require('mongoose');

const SongSchema = mongoose.Schema({
    songName: {
        type: String,
        required: true
    },
    //THE MAIN ARTIST - NAME
    artistName: {
        type: String,
        required: true
    },
    //THE MAIN & FEATURE ARTIST - ID
    artistId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Artist'
    }],
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Album'
    },
    genreId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Genre'

    },
    likeCount: {
        type: Number,
        default: 0,
        require: true
    },
    songImg: {
        type: String,
        required: true
    },
    songSrc: {
        type: String,
        required: true
    },
    create_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Song', SongSchema);