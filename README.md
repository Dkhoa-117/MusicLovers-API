# MusicLovers_API

Gồm: Users, Artists, Albums, Songs, Genres, Playlists.

Database: [MongoDB](https://www.mongodb.com)

test bằng [Postman](https://www.postman.com)

Chạy lệnh
> npm start

API chạy tại: [localhost:3000]()

📝 Nếu chạy trên máy ảo android studio, sử dụng địa chỉ [http://10.0.2.2:3000/]() kèm theo permission trong file AndroidManifest.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest ...>
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        ...
        android:usesCleartextTraffic="true"
        ...>
        ...
    </application>


</manifest>
```

## POST ***/user***
```
localhost:3000/users
```
_Tạo một user_
* userName
* email
* password

Body request mẫu:
```json
{
    "userName": "DangKhoa",
    "email": "Dangkhoa11227@gmail.com",
    "password": "dangkhoa"
}
```

Body response mẫu:
```json
{
    "_id": "6161679c5fb6a5e9f899acae",
    "userName": "DangKhoa",
    "email": "Dangkhoa11227@gmail.com",
    "create_at": "2021-10-09T09:57:48.591Z"
}
```
## POST ***/user/login***
```
localhost:3000/users/login
```
_Đăng nhập vào tài khoản_
* email
* password

Body Request mẫu:
```json
{
    "email": "Dangkhoa11227@gmail.com",
    "password": "dangkhoa"
}
```
## GET ***/users***
```
localhost:3000/users
```
_Yêu cầu tất cả user_

Body response mẫu:
```json
[
    {
        "_id": "6161679c5fb6a5e9f899acae",
        "userName": "DangKhoa",
        "password": "$2b$12$9plLmKmUg6.gl45Sp5Xvm.CXg/dYf.Zy1v8W0uR5U/eMRlY9.NT.6",
        "email": "Dangkhoa11227@gmail.com",
        "create_at": "2021-10-09T09:57:48.591Z",
        "__v": 0
    }
]
```
## GET ***/users/profile/:userId***
```
localhost:3000/users/profile/6161679c5fb6a5e9f899acae
```
_Yêu cầu một user cụ thể_

Body response mẫu:
```json
{
    "_id": "6161679c5fb6a5e9f899acae",
    "userName": "DangKhoa",
    "email": "Dangkhoa11227@gmail.com"
}
```
## DELETE ***/users/:userId***
```
localhost:3000/users/6161679c5fb6a5e9f899acae
```
_Xoá user_

***
## POST ***/albums***
```
localhost:3000/albums
```
_Tạo một album mới_

* albumName
* artistName
* artistId
* *albumImg* - tải lên một file ảnh (*jpeg* hoặc *png*), trường này sẽ là vị trí lưu ảnh trên server. 
* genreId

Request mẫu (làm trên Postman):
![image](https://github.com/Dkhoa-117/MusicLovers_API/blob/main/ref.%20pic/POST%20an%20album.png)
## GET ***/albums***
```
localhost:3000/albums
``` 
_Yêu cầu tất cả album_

Body response mẫu:
```json
[
    {
        "_id": "61617ccdb63363874cf01c9e",
        "albumName": "Kamikaze",
        "artistName": "Eminem",
        "artistId": "616178717ecf522fbeb71c50",
        "genreId": "6161793a7ecf522fbeb71c52",
        "albumImg": "uploads/image00007.jpeg",
        "__v": 0
    }
]
```
## GET ***/albums/:albumId***
```
localhost:3000/albums/
```
_Yêu cầu một album cụ thể_

## GET ***/albums/artist/:artistId***
```
localhost:3000/albums/artist/616173e2c50a4e682c2ae706
```
_Yêu cầu tất cả album của một nghệ sĩ cụ thể_

## GET ***/albums/genre/:genreId***
```
localhost:3000/albums/61617ccdb63363874cf01c9e
```
_Yêu cầu tất cả album theo một genre cụ thể_

## DELETE ***/albums/:albumId***
```
localhost:3000/albums/61617ccdb63363874cf01c9e
```
_Xoá một album_

## PATCH ***/albums/:albumId***
```
localhost:3000/albums/61617ccdb63363874cf01c9e
```
_Thay đổi genre của một album cụ thể_

***
## POST ***/artists***
```
localhost:3000/artists
```
* artistName
* *description* - sẽ được đặt mặc định là rỗng nếu không kèm theo.
* *artistImg* - Vị trí lưu ảnh nghệ sĩ tại server.

Body request mẫu (làm trên Postman):
![image](https://github.com/Dkhoa-117/MusicLovers_API/blob/main/ref.%20pic/POST%20an%20artist.png)
Response mẫu:
```json
{
    "artistName": "Eminem",
    "description": "",
    "artistImg": "uploads/image00007.jpeg",
    "_id": "616173e2c50a4e682c2ae706",
    "__v": 0
}
```
## GET ***/artists***
```
localhost:3000/artists
```
_Yêu cầu tất cả nghệ sĩ_

## GET ***/artists/:artistId***
```
localhost:3000/artists/616173e2c50a4e682c2ae706
```
_Yêu cầu nghệ sĩ cụ thể_
Response mẫu:
```json
{
    "_id": "616173e2c50a4e682c2ae706",
    "artistName": "Eminem",
    "description": "",
    "artistImg": "uploads/image00007.jpeg",
    "__v": 0
}
```
## PATCH ***/artists/:artistId***
```
localhost:3000/artists/616173e2c50a4e682c2ae706
```
_Thay đổi mô tả nghệ sĩ_

## DELETE ***/artists/:artistId***
```
localhost:3000/artists/616173e2c50a4e682c2ae706
```
_Xoá một nghệ sĩ_
Response mẫu: (xoá thành công!)
```
{
    "deletedCount": 1
}
```
***

## POST ***/genres***
```
localhost:3000/genres
```
_Tạo một genre_
* genreType

Request mẫu:
```
{
    "genreType": "Hip-Hop"
}
```
## GET ***/genres***
```
localhost:3000/genres
```
_Yêu cầu tất cả loại genre_

## GET ***/genres/:genreId***
```
localhost:3000/genres/6161793a7ecf522fbeb71c52
```
_Yêu cầu một loại genre cụ thể_

Response mẫu:
```
{
    "_id": "6161793a7ecf522fbeb71c52",
    "genreType": "Hip-Hop",
    "__v": 0
}
```

## PATCH ***/genres/:genreId***
```
localhost:3000/genres/6161793a7ecf522fbeb71c52
```
_Cập nhật lại loại genre_

## DELETE ***/genres/:genreId***
```
localhost:3000/genres/6161793a7ecf522fbeb71c52
```
_Xoá một genre_

***

## POST ***/playlists***
```
localhost/playlists
```
_Tạo một playlist_
* playlistName
* userId - người tạo playlist
* *playlistImg* - nơi lưu trữ hình ảnh playlist tại server.

Request mẫu (làm trên Postman):
![image](https://github.com/Dkhoa-117/MusicLovers_API/blob/main/ref.%20pic/POST%20a%20playlist.png)
Response mẫu:
```json
{
    "playlistName": "sad songs",
    "userId": "6161679c5fb6a5e9f899acae",
    "playlistImg": "uploads/image00007.jpeg",
    "songs": [],
    "numSongs": 0,
    "_id": "61618894b63363874cf01ca4",
    "__v": 0
}
```
## POST ***/playlists/:playlistId/songs/:songId***
```
localhost:3000/playlists/61618894b63363874cf01ca4/songs/61618b51b63363874cf01ca9
```
_Thêm một bài hát vào playlist_

Response mẫu:
```json
{
    "message": "Song added"
}
```

## GET ***/playlists***
```
localhost:3000/playlists
```
_Yêu cầu tất cả playlist_

## GET ***/playlists/user/:userId***
```
localhost:3000/playlists/user/6161679c5fb6a5e9f899acae
```
_Yêu cầu playlist của một người dùng_

Response mẫu
```json
[
    {
        "_id": "61618894b63363874cf01ca4",
        "playlistName": "sad songs",
        "userId": {
            "_id": "6161679c5fb6a5e9f899acae",
            "userName": "DangKhoa",
            "password": "$2b$12$9plLmKmUg6.gl45Sp5Xvm.CXg/dYf.Zy1v8W0uR5U/eMRlY9.NT.6",
            "email": "Dangkhoa11227@gmail.com",
            "create_at": "2021-10-09T09:57:48.591Z",
            "__v": 0
        },
        "playlistImg": "uploads/image00007.jpeg",
        "songs": [
            "61618b51b63363874cf01ca9"
        ],
        "numSongs": 1,
        "__v": 1
    }
]
```
## PATCH ***/playlists/:playlistId/name***
```
localhost:3000/playlists/61618894b63363874cf01ca4/name
```
_Đổi tên playlist_

Request mẫu:
```json
{
    "playlistName": "hey there"
}
```
Response mẫu:
```json
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```
## DELETE ***/playlists/:playlistId/songs/:songId***
```
localhost:3000/playlists/61618894b63363874cf01ca4/songs/61618b51b63363874cf01ca9
```
_Xoá một bài hát khỏi playlist_

Response mẫu:
```json
{
    "message": "Song removed!"
}
```
## DELETE ***/playlists/:playlistId***
```
localhost:3000/playlists/playlistId
```
_Xoá playlist_

***
## POST ***/songs***
```
localhost:3000/songs
```
_Thêm một bài hát_

* songName
* artistName
* artistId
* albumId
* genreId
* *songImg* - Vị trí lưu trữ hình ảnh của bài hát.
* *songSrc* - Vị trí lưu trữ audio của của bài hát.

Request mẫu: (làm bằng Postman)
![image](https://github.com/Dkhoa-117/MusicLovers_API/blob/main/ref.%20pic/POST%20a%20song.png)

## POST ***/songs/:songId/artist/:artistId***
```
localhost:3000/songs/61618b51b63363874cf01ca9/artist/616178717ecf522fbeb71c50
```
_Thêm một artist vào bài hát_

Response mẫu:
```
{
    "message": "Artist added"
}
```
## GET ***/songs***
```
localhost:3000/songs
```
_Yêu cầu tất cả bài hát_

Response mẫu:
```json
[
    {
        "_id": "61618b51b63363874cf01ca9",
        "songName": "Rap God",
        "artistName": "Eminem",
        "artistId": [
            "616178717ecf522fbeb71c50",
            "616178717ecf522fbeb71c50"
        ],
        "genreId": "6161793a7ecf522fbeb71c52",
        "likeCount": 0,
        "songImg": "uploads/image00007.jpeg",
        "songSrc": "uploads/audio00003.mp3",
        "__v": 1
    }
]
```
## GET ***/songs/:songId***
```
localhost:3000/songs/61618b51b63363874cf01ca9
```
_Yêu cầu một bài hát cụ thể_

## GET ***/songs/artist/:artistId***
```
localhost:3000/songs/artist/616178717ecf522fbeb71c50
```
_Yêu cầu bài hát của một nghệ sĩ cụ thể_

## GET ***/songs/album/:albumId***
```
localhost:3000/songs/album/61617ccdb63363874cf01c9e
```
_Yêu cầu tất cả bài hát của một album_

## GET ***/songs/genre/:genreId***
```
localhost:3000/songs/genre/6161793a7ecf522fbeb71c52
```
_Yêu cầu tất cả bài của một thể loại cụ thể_

## PATCH ***/songs/:songId/likes***
```
localhost:3000/songs/61618b51b63363874cf01ca9/likes
```
_Cập nhật số lượt like của bài hát_

## DELETE ***/songs/:songId***
```
localhost:3000/songs/61618b51b63363874cf01ca9
```
_Xoá bài hát_
