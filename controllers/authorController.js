import { Author } from "../models/author.js";

export async function createAuthor(req, res) {
  try {
    const author = new Author({ name: req.body.name });
    const saved = await author.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAuthors(req, res) {
  const authors = await Author.find();
  res.json(authors);
}

export async function getAuthor(req, res) {
  const author = await Author.findById(req.params.id);
  res.json(author);
}

export async function updateAuthor(req, res) {
  const updated = await Author.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  res.json(updated);
}

export async function deleteAuthor(req, res) {
  await Author.findByIdAndDelete(req.params.id);
  res.status(204).end();
}
