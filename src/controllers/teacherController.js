const Teacher = require("../models/teacherModel");

const getTeachers = async (req, res) => {
  const teachers = await Teacher.find({}).sort({ createdAt: -1 });

  res.status(200).json(teachers);
};

const getTeacher = async (req, res) => {};

const addNewTeacher = async (req, res) => {
  const { name, email, state_oforigin, subject, account_number, bank_name } =
    req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }

  if (!email) {
    emptyFields.push("email");
  }
  if (!state_oforigin) {
    emptyFields.push("state_oforigin");
  }
  if (!subject) {
    emptyFields.push("subject");
  }
  if (!account_number) {
    emptyFields.push("accountNumber");
  }
  if (!bank_name) {
    emptyFields.push("bankName");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields ", emptyFields });
  }

  try {
    const teacher = await Teacher.create({
      name,
      email,
      state_oforigin,
      subject,
      account_number,
      bank_name,
    });
    res.status(200).json(teacher);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};
const deleteTeacher = async (req, res) => {};
const updateTeacher = async (req, res) => {};

module.exports = {
  getTeachers,
  getTeacher,
  addNewTeacher,
  deleteTeacher,
  updateTeacher,
};
