const mongoose = require('mongoose');

const PlaylistSchema = mongoose.Schema({
    playlistName: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    playlistImg: {
        type: String
        //default: 
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        by: 'Song'
    }],
    numSongs: {
        type: Number,
        required: true,
        default: 0 
    }
});
module.exports = mongoose.model('Playlist', PlaylistSchema);