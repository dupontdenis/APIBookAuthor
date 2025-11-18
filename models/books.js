import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
});

export const Book = mongoose.model("Book", bookSchema);
