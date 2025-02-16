const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
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
      type: [String],
      default: []
    },
    account_number: {
      type: String,
      required: true,
    },
    bank_name: {
      type: String,
      required: true,
    },
    picture: {
      type: String
    },
    class: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
