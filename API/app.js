const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

//IMPORT ROUTES
app.use("/uploads", express.static("uploads"));
const songsRoute = require("./routes/songs");
app.use("/songs", songsRoute);
const artistsRoute = require("./routes/artists");
app.use("/artists", artistsRoute);
const albumsRoute = require("./routes/albums");
app.use("/albums", albumsRoute);
const genresRoute = require("./routes/genres");
app.use("/genres", genresRoute);
const playlistRoute = require("./routes/playlists");
app.use("/playlists", playlistRoute);
const usersRoute = require("./routes/users");
app.use("/users", usersRoute);
const lyricsRoute = require("./routes/lyrics");
app.use("/lyrics", lyricsRoute);

//GET
app.get("/", (req, res) => {
	res.send("API is running...");
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () =>
	console.log("CONNECT TO DATABASE!")
);

//Listening
app.listen(3000);
