# MusicLovers_API

## Chạy lệnh

> npm start

## Document
API được deploy lên evennode, truy cập qua đường dẫn `http://musiclovers.ap-1.evennode.com`

[![API Document](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/17748958/2s93Joz6W6)

API chạy tại: [localhost:4000]()

📝 Nếu chạy trên máy ảo android studio, sử dụng địa chỉ [http://10.0.2.2:3000/]() kèm theo permission trong file AndroidManifest.xml

Database: [MongoDB](https://www.mongodb.com)

test bằng [Postman](https://www.postman.com)

## Enviroment variables

| variable      | value                          |
| ------------- | ------------------------------ |
| PORT          | server port number             |
| DB_CONNECTION | database connect key           |
| JWT_SECRET    | jwt hash key                   |
| ADMIN_ID      | admin id to access admin route |

## Packages

- [pug](https://www.npmjs.com/package/pug)
- [cors](https://www.npmjs.com/package/cors)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [multer](https://www.npmjs.com/package/multer)
