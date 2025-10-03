import express from "express";
import db from "../config/db.js";
import ExcelJS from "exceljs";

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
    const insertSaleSql =
      "INSERT INTO sales (product_id, quantity_sold, total_price, cashier_id, date) VALUES (?, ?, ?, ?, NOW())";
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

// ✅ Get all sales with cashier name
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      sales.id, 
      products.name AS product_name, 
      sales.quantity_sold, 
      sales.total_price, 
      sales.cashier_id, 
      users.name AS cashier_name, 
      sales.date
    FROM sales
    JOIN products ON sales.product_id = products.id
    JOIN users ON sales.cashier_id = users.id
    ORDER BY sales.date DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

// ✅ Export sales to Excel with cashier name
router.get("/export", async (req, res) => {
  try {
    const sql = `
      SELECT 
        sales.id, 
        products.name AS product_name, 
        sales.quantity_sold, 
        sales.total_price, 
        sales.cashier_id, 
        users.name AS cashier_name, 
        sales.date
      FROM sales
      JOIN products ON sales.product_id = products.id
      JOIN users ON sales.cashier_id = users.id
      ORDER BY sales.date DESC
    `;
    db.query(sql, async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sales Report");

      // Define headers
      worksheet.columns = [
        { header: "Sale ID", key: "id", width: 10 },
        { header: "Product", key: "product_name", width: 25 },
        { header: "Quantity Sold", key: "quantity_sold", width: 15 },
        { header: "Total Price", key: "total_price", width: 15 },
        { header: "Cashier", key: "cashier_name", width: 20 },
        { header: "Date", key: "date", width: 25 },
      ];

      // Add rows
      results.forEach((row) => worksheet.addRow(row));

      // Style header row
      worksheet.getRow(1).font = { bold: true };

      // Send Excel file
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=Sales_Report.xlsx"
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      await workbook.xlsx.write(res);
      res.end();
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error exporting sales" });
  }
});

export default router;
