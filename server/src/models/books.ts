import mongoose, { model } from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: new Date(),
    },
    books: [
      {
        name: String,
        sell: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("books", schema);
