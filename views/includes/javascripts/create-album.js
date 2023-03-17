function SendData() {
	var data = new FormData();
	const albumName = document.getElementById("albumName").value;
	const artistName = document.getElementById("artistName").value;
	const artistId = document.getElementById("artistId").value;
	const genreId = document.getElementById("genreId").value;

	const albumImg = document.getElementById("albumImg");

	data.append("albumName", albumName);
	data.append("artistName", artistName);
	data.append("artistId", artistId);
	data.append("genreId", genreId);
	data.append("image", albumImg.files[0]);

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			console.log(this.responseText);
		}
	});

	xhr.open("POST", "http://localhost:4000/albums");

	xhr.send(data);
}
