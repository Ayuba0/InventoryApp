import express from "express";
import db from "../config/db.js";
import ExcelJS from "exceljs";

const router = express.Router();

// Utility: create Excel and send response
async function exportToExcel(res, reportName, columns, rows) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(reportName);

  worksheet.columns = columns;
  rows.forEach(row => worksheet.addRow(row));

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${reportName}.xlsx`
  );

  await workbook.xlsx.write(res);
  res.end();
}

// ✅ Daily Sales Report
router.get("/daily", (req, res) => {
  const sql = `
    SELECT p.name AS product_name, s.quantity, s.total, s.sold_at
    FROM sales s
    JOIN products p ON s.product_id = p.id
    WHERE DATE(s.sold_at) = CURDATE()
    ORDER BY s.sold_at DESC
  `;

  db.query(sql, async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    await exportToExcel(res, "daily_sales_report", [
      { header: "Product", key: "product_name", width: 25 },
      { header: "Quantity Sold", key: "quantity", width: 15 },
      { header: "Total Price", key: "total", width: 15 },
      { header: "Date", key: "sold_at", width: 20 },
    ], results);
  });
});

// ✅ Weekly Sales Report
router.get("/weekly", (req, res) => {
  const sql = `
    SELECT p.name AS product_name, s.quantity, s.total, s.sold_at
    FROM sales s
    JOIN products p ON s.product_id = p.id
    WHERE YEARWEEK(s.sold_at, 1) = YEARWEEK(CURDATE(), 1)
    ORDER BY s.sold_at DESC
  `;

  db.query(sql, async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    await exportToExcel(res, "weekly_sales_report", [
      { header: "Product", key: "product_name", width: 25 },
      { header: "Quantity Sold", key: "quantity", width: 15 },
      { header: "Total Price", key: "total", width: 15 },
      { header: "Date", key: "sold_at", width: 20 },
    ], results);
  });
});

export default router;
