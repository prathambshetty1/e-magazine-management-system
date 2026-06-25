const mongoose = require("mongoose");
const categories = require("../config/categories");
const submissionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
    type: String,
    required: true,
    enum: categories,
},

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
    type: String,
    enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Published",
    ],
    default: "Pending",
},

    feedback: {
    type: String,
    default: "",
},

reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
},

reviewedAt: {
    type: Date,
    default: null,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Submission",
  submissionSchema
);