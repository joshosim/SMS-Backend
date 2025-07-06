const express = require("express");
const {
  addProject
} = require("../controllers/extraController");

const router = express.Router();

router.get("/addproject", addProject);


module.exports = router;
