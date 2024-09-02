const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    state_oforigin: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    account_number: {
      type: String,
      required: true,
    },
    bank_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
