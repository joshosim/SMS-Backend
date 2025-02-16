
const Student = require("../models/studentModel");
const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})


//get all students in the school
const getAllStudents = async (req, res) => {
  try {
    const allStudents = await Student.find({}).sort({ createdAt: -1 });
    res.status(200).json(allStudents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching all students in the school", error });
    console.log(error);
  }
};

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
const getStudentsInSss3 = async (req, res) => {
  try {
    // Fetch students where the studentClass is 'jss3'
    const studentsInSss3 = await Student.find({ studentClass: "SSS3" }).sort({
      createdAt: -1,
    });

    res.status(200).json(studentsInSss3);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students in SSS3", error });
    console.log(error);
  }
};
const getStudentsInSss2 = async (req, res) => {
  try {
    // Fetch students where the studentClass is 'jss3'
    const studentsInSss2 = await Student.find({ studentClass: "SSS2" }).sort({
      createdAt: -1,
    });

    res.status(200).json(studentsInSss2);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students in SSS2", error });
    console.log(error);
  }
};
const getStudentsInSss1 = async (req, res) => {
  try {
    // Fetch students where the studentClass is 'jss3'
    const studentsInSss1 = await Student.find({ studentClass: "SSS1" }).sort({
      createdAt: -1,
    });

    res.status(200).json(studentsInSss1);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students in SSS1", error });
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
  try {
    const requiredFields = [
      "firstname",
      "lastname",
      "dob",
      "stateOfOrigin",
      "studentClass",
      "guardianPhone",
      "studentPicture"
    ]

    let emptyFields = requiredFields.filter(field => !req.body[field])

    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Please fill all the fields ", emptyFields });
    }

    let studentPictureUrl = '';
    if (req.body.studentPicture) {
      const uploadedResponse = await cloudinary.uploader.upload(req.body.studentPicture, {
        folder: 'students',
        resource_type: 'image'
      });
      studentPictureUrl = uploadedResponse.secure_url;
    }

    const student = await Student.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      dob: req.body.dob,
      stateOfOrigin: req.body.stateOfOrigin,
      studentClass: req.body.studentClass,
      guardianPhone: req.body.guardianPhone,
      studentPicture: studentPictureUrl,
    });
    res.status(201).json(student);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  //check if the 'id' is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid student ID' })
  }

  try {
    //find and delete the student
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found!' })
    }

    res.status(200).json({ message: 'Student deleted successfully', deletedStudent })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting student', details: error.message })
  }
};
const updateStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid Student ID' })
  }

  try {
    const updatedStudent = await Student.findByIdAndUpdate(id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' })
    }

    res.status(200).json({ message: 'Student updated successfully', updatedStudent })

  } catch (error) {
    res.status(500).json({ error: "Error updating student", details: error.message });
  }
};

module.exports = {
  getStudentsInJss1,
  getStudentsInJss2,
  getStudentsInJss3,
  getStudentsInSss1,
  getStudentsInSss2,
  getStudentsInSss3,
  getStudent,
  addNewStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
};
