import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [sales, setSales] = useState([]);
  const [filter, setFilter] = useState("daily");

  // Fetch preview data
  const fetchSalesPreview = async (type) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/sales-report/preview/${type}`);
      setSales(res.data);
    } catch (err) {
      console.error("Error fetching sales:", err);
      setSales([]);
    }
  };

  useEffect(() => {
    fetchSalesPreview(filter);
  }, [filter]);

  // Download Excel
  const downloadReport = (type) => {
    const url = `http://localhost:5000/api/sales-report/download/${type}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}_sales_report.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Sales Reports</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>

        <button
          onClick={() => downloadReport(filter)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          Download Excel
        </button>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-md bg-white">
        {sales.length > 0 ? (
          <table className="min-w-full border-collapse">
            <thead className="bg-blue-100 sticky top-0 z-10">
              <tr>
                <th className="border px-4 py-2 text-left">Sale ID</th>
                <th className="border px-4 py-2 text-left">Product</th>
                <th className="border px-4 py-2 text-left">Quantity</th>
                <th className="border px-4 py-2 text-left">Total Price</th>
                <th className="border px-4 py-2 text-left">Cashier</th>
                <th className="border px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s, idx) => (
                <tr
                  key={s.id}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border px-4 py-2">{s.id}</td>
                  <td className="border px-4 py-2">{s.product_name}</td>
                  <td className="border px-4 py-2">{s.quantity_sold}</td>
                  <td className="border px-4 py-2">
                    ₦{Number(s.total_price).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">{s.cashier_name}</td>
                  <td className="border px-4 py-2">{new Date(s.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-gray-500">No sales found for {filter}.</p>
        )}
      </div>
    </div>
  );
}
