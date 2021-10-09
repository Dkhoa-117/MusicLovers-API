const mongoose = require('mongoose');

const ArtistSchema = mongoose.Schema({
    artistName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    artistImg: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Artist', ArtistSchema);