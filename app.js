import express from "express";
import mongoose from "mongoose";
import authorRoutes from "./routes/authorRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/library");

app.use("/authors", authorRoutes);
app.use('/books', bookRoutes);

// Debug: list registered routes
if (process.env.DEBUG_ROUTES) {
  console.log("Registered routes:");
  app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
      console.log(
        Object.keys(r.route.methods).join(",").toUpperCase(),
        r.route.path
      );
    }
  });
}

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
