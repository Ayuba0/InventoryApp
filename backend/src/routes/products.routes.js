import express from "express";
import db from "../config/db.js";

const router = express.Router();

// ✅ Add a new product
router.post("/", (req, res) => {
  const { name, category, quantity, price } = req.body;

  if (!name || !category || !quantity || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO products (name, category, quantity, price, created_at) VALUES (?, ?, ?, ?, NOW())";
  db.query(sql, [name, category, quantity, price], (err, result) => {
    if (err) {
      console.error("Error adding product:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "Product added successfully", productId: result.insertId });
  });
});

// ✅ Get all products
router.get("/", (req, res) => {
  const sql = "SELECT * FROM products ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

// ✅ Get a single product by ID
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(results[0]);
  });
});

// ✅ Update a product
router.put("/:id", (req, res) => {
  const { name, category, quantity, price } = req.body;
  const sql = "UPDATE products SET name=?, category=?, quantity=?, price=? WHERE id=?";
  db.query(sql, [name, category, quantity, price, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Product updated successfully" });
  });
});

// ✅ Delete a product
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM products WHERE id=?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Product deleted successfully" });
  });
});

export default router;
