const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
      trim: true,
      match: /^https?:\/\//i,
    },
    image: {
      type: String,
      required: true,
    },
    tools: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) =>
          Array.isArray(arr) && arr.every((s) => typeof s === 'string' && s.trim().length > 0),
        message: 'Each tool must be a non‑empty string.',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
