import { Book } from "../models/books.js";

export async function createBook(req, res) {
  try {
    const book = new Book({ title: req.body.title, authors: req.body.authors });
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getBooks(req, res) {
  const books = await Book.find().populate("authors");
  res.json(books);
}

export async function getBook(req, res) {
  const book = await Book.findById(req.params.id).populate("authors");
  res.json(book);
}

export async function updateBook(req, res) {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate("authors");
  res.json(updated);
}

export async function deleteBook(req, res) {
  await Book.findByIdAndDelete(req.params.id);
  res.status(204).end();
}
