function SendData() {
	var data = new FormData();
	const artistName = document.getElementById("artistName").value;
	const description = document.getElementById("description").value;
	const artistImg = document.getElementById("artistImg");

	data.append("artistName", artistName);
	data.append("description", description);
	data.append("image", artistImg.files[0]);

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			console.log(this.responseText);
		}
	});

	xhr.open("POST", "http://localhost:4000/artists");

	xhr.send(data);
}
