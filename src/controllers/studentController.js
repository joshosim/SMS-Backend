const Student = require("../models/studentModel");
const mongoose = require("mongoose");

const getStudentsInJss1 = async (req, res) => {
  try {
    // Fetch students where the studentClass is 'jss1'
    const studentsInJss1 = await Student.find({ studentClass: "JSS1" }).sort({
      createdAt: -1,
    });

    res.status(200).json(studentsInJss1);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students in JSS1", error });
    console.log(error);
  }
};
const getStudentsInJss2 = async (req, res) => {
  try {
    // Fetch students where the studentClass is 'jss2'
    const studentsInJss2 = await Student.find({ studentClass: "JSS2" }).sort({
      createdAt: -1,
    });

    res.status(200).json(studentsInJss2);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students in JSS2", error });
    console.log(error);
  }
};
const getStudentsInJss3 = async (req, res) => {
  try {
    // Fetch students where the studentClass is 'jss3'
    const studentsInJss3 = await Student.find({ studentClass: "JSS3" }).sort({
      createdAt: -1,
    });

    res.status(200).json(studentsInJss3);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students in JSS3", error });
    console.log(error);
  }
};
const getStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }
  const student = await Student.findById(id);
  if (!student) {
    return res.status(404).json({ err: "Student not found!" });
  }

  res.status(200).json(student);
};

const addNewStudent = async (req, res) => {
  const { name, age, dob, stateOfOrigin, studentClass } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!age) {
    emptyFields.push("age");
  }
  if (!dob) {
    emptyFields.push("dob");
  }
  if (!stateOfOrigin) {
    emptyFields.push("stateOfOrigin");
  }
  if (!studentClass) {
    emptyFields.push("studentClass");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields ", emptyFields });
  }

  try {
    const student = await Student.create({
      name,
      age,
      studentClass,
      dob,
      stateOfOrigin,
    });
    res.status(200).json(student);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const deleteStudent = async (req, res) => {};
const updateStudent = async (req, res) => {};

module.exports = {
  getStudentsInJss1,
  getStudentsInJss2,
  getStudentsInJss3,
  getStudent,
  addNewStudent,
  deleteStudent,
  updateStudent,
};
