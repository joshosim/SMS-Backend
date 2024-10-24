const express = require("express");

const router = express.Router();

//create user account
router.post("/user/create", createUserAccount);
//delete user account
router.delete("/user/delete/:userId", deleteUserAccount);
//get user information
router.get("/user/userInfo", getUserInformation);

module.exports = router;
