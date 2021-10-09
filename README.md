# MusicLovers_API

Gồm: Users, Artists, Albums, Songs, Genres, Playlists.

Database: [MongoDB](https://www.mongodb.com)

test bằng [Postman](https://www.postman.com)

Chạy lệnh
> npm start

API chạy tại: [https://localhost:3000]()

## POST ***/user***
```
https://localhost:3000/users
```
_Tạo một user_
* userName
* email
* password

Body request mẫu:
```
{
    "userName": "DangKhoa",
    "email": "Dangkhoa11227@gmail.com",
    "password": "dangkhoa"
}
```

Body response mẫu:
```
{
    "_id": "6161679c5fb6a5e9f899acae",
    "userName": "DangKhoa",
    "email": "Dangkhoa11227@gmail.com",
    "create_at": "2021-10-09T09:57:48.591Z"
}
```
## POST ***/user/login***
```
https://localhost:3000/users/login
```
_Đăng nhập vào tài khoản_
* email
* password

Body Request mẫu:
```
{
    "email": "Dangkhoa11227@gmail.com",
    "password": "dangkhoa"
}
```
## GET ***/users***
```
https://localhost:3000/users
```
_Yêu cầu tất cả user_

Body response mẫu:
```
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
https://localhost:3000/users/profile/6161679c5fb6a5e9f899acae
```
_Yêu cầu một user cụ thể_

Body response mẫu:
```
{
    "_id": "6161679c5fb6a5e9f899acae",
    "userName": "DangKhoa",
    "email": "Dangkhoa11227@gmail.com"
}
```
## DELETE ***/users/:userId***
```
https://localhost:3000/users/6161679c5fb6a5e9f899acae
```
_Xoá user_

***
## POST ***/albums***
```
https://localhost:3000/albums
```
_Tạo một album mới_

* albumName
* artistName
* artistId
* *albumImg* - tải lên một file ảnh (*jpeg* hoặc *png*), trường này sẽ là vị trí lưu ảnh trên server. 
* genreId

Request mẫu (làm trên Postman):

## GET ***/albums***
```
https://localhost:3000/albums
``` 
_Yêu cầu tất cả album_

Body response mẫu:
```
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
https://localhost:3000/albums/
```
_Yêu cầu một album cụ thể_

## GET ***/albums/artist/:artistId***
```
https://localhost:3000/albums/artist/616173e2c50a4e682c2ae706
```
_Yêu cầu tất cả album của một nghệ sĩ cụ thể_

## GET ***/albums/genre/:genreId***
```
https://localhost:3000/albums/61617ccdb63363874cf01c9e
```
_Yêu cầu tất cả album theo một genre cụ thể_

## DELETE ***/albums/:albumId***
```
https://localhost:3000/albums/61617ccdb63363874cf01c9e
```
_Xoá một album_

## PATCH ***/albums/:albumId***
```
https://localhost:3000/albums/61617ccdb63363874cf01c9e
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
[]()
Response mẫu:
```
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
```
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
https://localhost/playlists
```
_Tạo một playlist_
* playlistName
* userId - người tạo playlist
* *playlistImg* - nơi lưu trữ hình ảnh playlist tại server.

Request mẫu (làm trên Postman):

Response mẫu:
```
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
https://localhost:3000/playlists/61618894b63363874cf01ca4/songs/61618b51b63363874cf01ca9
```
_Thêm một bài hát vào playlist_

Response mẫu:
```
{
    "message": "Song added"
}
```

## GET ***/playlists***
```
https://localhost:3000/playlists
```
_Yêu cầu tất cả playlist_

## GET ***/playlists/user/:userId***
```

```

