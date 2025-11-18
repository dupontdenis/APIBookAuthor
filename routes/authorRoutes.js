import express from "express";
import {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController.js";

const router = express.Router();

// Routes pour la collection entière
router
  .route("/")
  .post(createAuthor) // ➕ Créer un auteur
  .get(getAuthors); // 📄 Lister tous les auteurs

// Routes pour une ressource spécifique
router
  .route("/:id")
  .get(getAuthor) // 🔍 Obtenir un auteur par ID
  .put(updateAuthor) // ✏️ Mettre à jour un auteur
  .delete(deleteAuthor); // ❌ Supprimer un auteur

export default router;
