import express from "express";
import {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

// Routes pour la collection entière
router
  .route("/")
  .post(createBook) // ➕ Créer un livre
  .get(getBooks); // 📄 Lister tous les livres

// Routes pour une ressource spécifique
router
  .route("/:id")
  .get(getBook) // 🔍 Obtenir un livre par ID
  .put(updateBook) // ✏️ Mettre à jour un livre
  .delete(deleteBook); // ❌ Supprimer un livre

export default router;
