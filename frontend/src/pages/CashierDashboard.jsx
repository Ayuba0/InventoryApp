import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/solid";
import Navbar from "../components/Navbar";

export default function CashierDashboard({ user }) {
  const [recentSales, setRecentSales] = useState([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch recent sales and summary
  const fetchSalesData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/sales-report/cashier/${user?.id}`
      );
      const sales = res.data || [];

      // Sort and slice
      const sortedSales = sales
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
      setRecentSales(sortedSales);

      // Summary
      const totalRevenue = sales.reduce(
        (sum, s) => sum + Number(s.total_price || 0),
        0
      );
      setSummary({ totalRevenue, totalTransactions: sales.length });
    } catch (err) {
      console.error("Error fetching sales data:", err);
      setRecentSales([]);
      setSummary({ totalRevenue: 0, totalTransactions: 0 });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.id) fetchSalesData();
  }, [user]);

  const totalRevenueRounded = Math.ceil(summary.totalRevenue / 1000) * 1000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto mt-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            
            <span className="text-blue-600">{user?.name || "Cashier"}</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Here’s an overview of today’s sales performance.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Revenue Card */}
          <div className="bg-white hover:shadow-lg transition rounded-2xl p-6 border border-gray-100 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold">
                Total Revenue
              </p>
              <h2 className="text-2xl font-bold text-green-700">
                ₦{totalRevenueRounded.toLocaleString()}
              </h2>
            </div>
          </div>

          {/* Transactions Card */}
          <div className="bg-white hover:shadow-lg transition rounded-2xl p-6 border border-gray-100 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <ShoppingCartIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold">
                Transactions
              </p>
              <h2 className="text-2xl font-bold text-blue-700">
                {summary.totalTransactions.toLocaleString()}
              </h2>
            </div>
          </div>

          {/* Quick Access Card */}
          <div className="bg-white hover:shadow-lg transition rounded-2xl p-6 border border-gray-100 flex items-center gap-4 cursor-pointer">
            <div className="bg-purple-100 p-3 rounded-full">
              <ReceiptPercentIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold">Quick Access</p>
              <h2 className="text-2xl font-bold text-purple-700">
                Process Sale
              </h2>
            </div>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Transactions
            </h2>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center text-gray-500">
                Loading transactions...
              </div>
            ) : recentSales.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No transactions found
              </div>
            ) : (
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Product</th>
                    <th className="px-6 py-3 text-left font-semibold">Quantity</th>
                    <th className="px-6 py-3 text-left font-semibold">Total</th>
                    <th className="px-6 py-3 text-left font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map((sale, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition`}
                    >
                      <td className="px-6 py-3 border-t">{sale.product_name}</td>
                      <td className="px-6 py-3 border-t">{sale.quantity_sold}</td>
                      <td className="px-6 py-3 border-t font-semibold text-green-600">
                        ₦{Number(sale.total_price).toLocaleString()}
                      </td>
                      <td className="px-6 py-3 border-t text-gray-500">
                        {new Date(sale.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
