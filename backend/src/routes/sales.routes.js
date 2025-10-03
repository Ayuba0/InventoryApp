import express from "express";
import db from "../config/db.js";

const router = express.Router();

// ✅ Record a new sale
router.post("/", (req, res) => {
  const { product_id, quantity_sold, cashier_id } = req.body;

  if (!product_id || !quantity_sold || !cashier_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Step 1: Get product details
  const getProductSql = "SELECT * FROM products WHERE id = ?";
  db.query(getProductSql, [product_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "Product not found" });

    const product = results[0];

    // Step 2: Check stock
    if (product.quantity < quantity_sold) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    const total_price = product.price * quantity_sold;

    // Step 3: Insert into sales
    const insertSaleSql = "INSERT INTO sales (product_id, quantity_sold, total_price, cashier_id, date) VALUES (?, ?, ?, ?, NOW())";
    db.query(insertSaleSql, [product_id, quantity_sold, total_price, cashier_id], (err, result) => {
      if (err) return res.status(500).json({ message: "Error recording sale" });

      // Step 4: Update product stock
      const updateStockSql = "UPDATE products SET quantity = quantity - ? WHERE id = ?";
      db.query(updateStockSql, [quantity_sold, product_id]);

      res.status(201).json({
        message: "Sale recorded successfully",
        saleId: result.insertId,
        total_price,
      });
    });
  });
});

// ✅ Get all sales
router.get("/", (req, res) => {
  const sql = `
    SELECT sales.id, products.name AS product_name, sales.quantity_sold, sales.total_price, sales.cashier_id, sales.date
    FROM sales
    JOIN products ON sales.product_id = products.id
    ORDER BY sales.date DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

export default router;
