const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const errorsHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

dotenv.config();
const app = express();
app.set("view engine", "pug");
app.use(cors());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

// NOTE: STATIC
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
// NOTE: API ROUTE
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

const port = process.env.PORT || 4000;
//NOTE: UI
app.get("/", (req, res) => {
	res.render("index", { message: `API is running on port ${port}` });
});
const adminRoute = require("./routes/admin");
app.use("/admin", adminRoute);

// NOTE: Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () =>
	console.log("CONNECT TO DATABASE!")
);

// NOTE: EXCEPTIONS HANDLER
app.use(notFound);
app.use(errorsHandler);

// NOTE: SERVER LISTENING
app.listen(port, () => {
	console.log(`API is running at ${port}`);
});
