const router = require("express").Router();
const {
	getAll,
	getUserbyID,
	login,
	register,
	deleteUser,
} = require("../controllers/user");

//1. GET
//1.1. get all users
router.get("/", getAll);
//1.2. get specific user
router.get("/profile/:userId", getUserbyID);

//2. PATCH - upload avatar

//3. DELETE - delete user
router.delete("/:userId", deleteUser);

//4. POST
//4.1. login
router.post("/login", login);
//4.2. register
router.post("/", register);

module.exports = router;
