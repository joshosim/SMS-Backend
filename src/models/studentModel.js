const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    stateOfOrigin: {
      type: String,
      required: true,
    },
    studentClass: {
      type: String,
      required: true,
    },
    guardianPhone: {
      type: [String],
      default: []
    },
    studentPicture: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
