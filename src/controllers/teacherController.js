const Teacher = require("../models/teacherModel");

const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({}).sort({ createdAt: -1 });

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers", error });
    console.log(error);
  }
};

const getTeacher = async (req, res) => {
  const { id } = req.params;
};

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

const deleteTeacher = async (req, res) => {
  const { id } = req.params;

  //check if the 'id' is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Invalid teacher's ID"
    })
  }

  try {

    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return res.status(404).json({ error: 'Teacher not found!' })
    }

    res.status(200).json({ message: 'Teacher deleted successfully', deletedTeacher })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting teacher', details: error.message })
  }
};

const updateTeacher = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid Teacher ID' })
  }

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' })
    }

    res.status(200).json({ message: 'Teacher updated successfully', updatedTeacher })

  } catch (error) {
    res.status(500).json({ error: "Error updating teacher", details: error.message });
  }
};
module.exports = {
  getTeachers,
  getTeacher,
  addNewTeacher,
  deleteTeacher,
  updateTeacher,
};
