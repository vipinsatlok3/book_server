import mongoose, { model } from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      default: Math.floor(Math.random() * 900000 + 1000000),
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default model("users", schema);
