import express from "express";
import db from "../config/db.js";
import ExcelJS from "exceljs";

const router = express.Router();

// Helper to get sales data by filter
const getSalesData = (filter, callback) => {
  let dateCondition = "";
  if (filter === "daily") {
    dateCondition = "WHERE DATE(sales.date) = CURDATE()";
  } else if (filter === "weekly") {
    dateCondition = "WHERE YEARWEEK(sales.date, 1) = YEARWEEK(CURDATE(), 1)";
  }

  const sql = `
    SELECT sales.id,
           products.name AS product_name,
           sales.quantity_sold,
           sales.total_price,
           users.name AS cashier_name,
           sales.date
    FROM sales
    JOIN products ON sales.product_id = products.id
    JOIN users ON sales.cashier_id = users.id
    ${dateCondition}
    ORDER BY sales.date DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// --- JSON route for table preview ---
router.get("/preview/:type", (req, res) => {
  const { type } = req.params;
  getSalesData(type, (err, sales) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (!sales || sales.length === 0) return res.json([]);
    res.json(sales);
  });
});

// --- Excel route for download ---
router.get("/download/:type", (req, res) => {
  const { type } = req.params;
  getSalesData(type, async (err, sales) => {
    if (err) return res.status(500).json({ message: "Database error" });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${type.toUpperCase()} Sales Report`);

    worksheet.columns = [
      { header: "Sale ID", key: "id", width: 10 },
      { header: "Product", key: "product_name", width: 25 },
      { header: "Quantity Sold", key: "quantity_sold", width: 15 },
      { header: "Total Price", key: "total_price", width: 15 },
      { header: "Cashier", key: "cashier_name", width: 20 },
      { header: "Date", key: "date", width: 25 },
    ];

    sales.forEach((sale) => worksheet.addRow(sale));
    worksheet.getRow(1).font = { bold: true };

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${type}_sales_report.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    await workbook.xlsx.write(res);
    res.end();
  });
});

export default router;
