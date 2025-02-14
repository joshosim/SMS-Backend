const express = require("express");
const {
  getStudentsInJss1,
  getStudentsInJss2,
  getStudentsInJss3,
  getStudentsInSss1,
  getStudentsInSss2,
  getStudentsInSss3,
  getStudent,
  addNewStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
} = require("../controllers/studentController");

const router = express.Router();

router.get("/jss1", getStudentsInJss1);
router.get("/jss2", getStudentsInJss2);
router.get("/jss3", getStudentsInJss3);
router.get('/sss1', getStudentsInSss1)
router.get('/sss2', getStudentsInSss2)
router.get('/sss3', getStudentsInSss3)
router.get("/:id", getStudent);
router.post("/", addNewStudent);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.get("/all", getAllStudents);

module.exports = router;
