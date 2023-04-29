import mongoose, { model, models } from "mongoose";

const schema = new mongoose.Schema(
  {
    place: String,
    date: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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

export const bookModel = models.books || model("books", schema);
