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
    playlist_number: {
        type: Number,
        required: true
    },
    playlistImg: {
        type: String,
        default: 'uploads/default_playlist.jpeg'
    },
    songId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
    numSongs: {
        type: Number,
        required: true,
        default: 0
    }
});
module.exports = mongoose.model('Playlist', PlaylistSchema);