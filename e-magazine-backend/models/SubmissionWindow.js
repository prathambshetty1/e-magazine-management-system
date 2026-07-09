const mongoose = require("mongoose");
const categories = require("../config/categories");

const submissionWindowSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
      enum: categories,
    },

    openDate: {
      type: Date,
      required: true,
    },

    closeDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SubmissionWindow",
  submissionWindowSchema
);