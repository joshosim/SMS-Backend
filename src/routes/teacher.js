const express = require("express");

const router = express.Router();

const {
  getTeachers,
  getTeacher,
  addNewTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

router.get("/", getTeachers);
router.get("/:id", getTeacher);
router.post("/", addNewTeacher);
router.patch("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;
