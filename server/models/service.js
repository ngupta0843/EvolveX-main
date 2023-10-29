const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const serviceSchema = new Schema(
  {
    title: {
      type: String,
      required: "Title is required",
    },
    description: {
      type: String,
      required: "Description is required",
      maxlength: 10000,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
