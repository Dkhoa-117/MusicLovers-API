const mongoose = require("mongoose");

const LyricsSchema = mongoose.Schema({
	songId: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
		ref: "Songs",
	},
	lyrics: {
		type: String,
	},
	time: [
		{
			type: Number,
		},
	],
});
module.exports = mongoose.model("Lyrics", LyricsSchema);
