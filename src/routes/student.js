const express = require("express");
const {
  getStudentsInJss1,
  getStudentsInJss2,
  getStudentsInJss3,
  getStudent,
  addNewStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();

router.get("/jss1", getStudentsInJss1);
router.get("/jss2", getStudentsInJss2);
router.get("/jss3", getStudentsInJss3);
router.get("/:id", getStudent);
router.post("/", addNewStudent);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
