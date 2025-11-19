# APIBookAuthor

## Overview

**Important:** You must create authors before you can create books, because each book references one or more existing authors by their MongoDB `_id`. Always add your authors first, then use their IDs when creating books.

This app is a simple Node.js REST API for managing books and authors using Express and Mongoose (MongoDB). It demonstrates a many-to-many relationship between books and authors, where each book can have multiple authors, and each author can contribute to multiple books.

## Design Choice: Many-to-Many Reference

- **Only books store references to authors**: In the `Book` model, the `authors` field is an array of ObjectId references to the `Author` model.
- **Authors do NOT store references to books**: This keeps the author schema simple and avoids duplication or circular references.

### Why this choice?

- It simplifies updates: When a book's authors change, only the book document needs updating.
- It avoids data inconsistency: No need to sync references in both directions.
- It is efficient for most queries: You usually want to list all books for an author, which is easy to do with a query.

## How to retrieve all books for a given author (the "trick")

To get all books written by a specific author, query the `Book` collection for documents where the `authors` array contains the author's `_id`:

```js
// In a controller or route:
const books = await Book.find({ authors: authorId });
```

Or with REST Client/cURL:

```http
GET http://localhost:3000/books?author=AUTHOR_ID
```

(You can add a custom route or query param to support this.)

## Main Features

- Create, read, update, delete authors
- Create, read, update, delete books (with author references)
- Populate author details when listing books

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start MongoDB (locally or via Docker)
3. Run the app:
   ```bash
   node app.js
   ```
4. Use the provided `.http` file or any REST client to test endpoints.

## Example Models

**Author**

```js
const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
```

**Book**

```js
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
});
```

## Extending: Query books by author

To support queries like "all books by author X", you can add a route in `bookRoutes.js`:

```js
router.get("/", async (req, res) => {
  if (req.query.author) {
    const books = await Book.find({ authors: req.query.author }).populate(
      "authors"
    );
    return res.json(books);
  }
  // ...existing code...
});
```

## Advanced: Create a book without authors, then add authors later

You can create a book without any authors, then update it later to add author references.

**Step 1: Create a book without authors**

```http
POST http://localhost:3000/books
Content-Type: application/json

{
  "title": "Book Without Author"
}
```

**Step 2: Update the book to add authors later**

```http
PUT http://localhost:3000/books/BOOK_ID
Content-Type: application/json

{
  "title": "Book Without Author",
  "authors": ["AUTHOR_ID"]
}
```

**Or, add authors without overwriting other fields (controller and route):**

In `controllers/bookController.js`:

```js
export async function addAuthorsToBook(req, res) {
  const { bookId } = req.params;
  const { authors } = req.body; // array of author IDs
  const updated = await Book.findByIdAndUpdate(
    bookId,
    { $addToSet: { authors: { $each: authors } } },
    { new: true }
  ).populate("authors");
  res.json(updated);
}
```

In `routes/bookRoutes.js`:

```js
router.patch("/:id/authors", addAuthorsToBook);
```

This lets you create books first, then add author references later.

## License

MIT
