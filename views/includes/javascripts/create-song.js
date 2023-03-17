function SendData() {
	var data = new FormData();
	const songName = document.getElementById("songName").value;
	const artistName = document.getElementById("artistName").value;
	const artistId = document.getElementById("artistId").value;
	const albumId = document.getElementById("albumId").value;
	const genreId = document.getElementById("genreId").value;

	const songImg = document.getElementById("songImg");
	const songSrc = document.getElementById("songSrc");

	data.append("songName", songName);
	data.append("artistName", artistName);
	data.append("artistId", artistId);
	data.append("albumId", albumId);
	data.append("genreId", genreId);
	data.append("image", songImg.files[0]);
	data.append("audio", songSrc.files[0]);

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			console.log(this.responseText);
		}
	});

	xhr.open("POST", "http://localhost:4000/songs");

	xhr.send(data);
}
