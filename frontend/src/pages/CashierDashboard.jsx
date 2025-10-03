import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { CurrencyDollarIcon, ShoppingCartIcon, ReceiptPercentIcon } from "@heroicons/react/24/solid";

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

      // Recent transactions: latest 10
      const sortedSales = sales
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
      setRecentSales(sortedSales);

      // Summary calculations
      const totalRevenue = sales.reduce(
        (sum, s) => sum + Number(s.total_price || 0),
        0
      );
      const totalTransactions = sales.length;
      setSummary({ totalRevenue, totalTransactions });
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
    <div className="min-h-screen bg-gray-100 p-6">
     

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Today's Revenue" className="flex items-center gap-4 p-6">
          <CurrencyDollarIcon className="h-12 w-12 text-green-500" />
          <div>
            <span className="text-gray-500 font-semibold">Today's Revenue</span>
            <p className="text-2xl font-bold text-green-600">
              ₦{totalRevenueRounded.toLocaleString()}
            </p>
          </div>
        </Card>

        <Card
          title="Number of Transactions"
          className="flex items-center gap-4 p-6"
        >
          <ShoppingCartIcon className="h-12 w-12 text-blue-500" />
          <div>
            <span className="text-gray-500 font-semibold">Transactions</span>
            <p className="text-2xl font-bold text-blue-600">
              {summary.totalTransactions.toLocaleString()}
            </p>
          </div>
        </Card>

        <Card title="Quick Access" className="flex items-center gap-4 p-6">
          <ReceiptPercentIcon className="h-12 w-12 text-purple-500" />
          <div>
            <span className="text-gray-500 font-semibold">Process Sale</span>
            <p className="text-2xl font-bold text-purple-600">Quick Access</p>
          </div>
        </Card>
      </div>

      {/* Recent Transactions Table */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto bg-white rounded shadow p-4">
          {loading ? (
            <p>Loading transactions...</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  recentSales.map((sale, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{sale.product_name}</td>
                      <td className="border px-4 py-2">{sale.quantity_sold}</td>
                      <td className="border px-4 py-2">
                        ₦{Number(sale.total_price).toLocaleString()}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(sale.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
