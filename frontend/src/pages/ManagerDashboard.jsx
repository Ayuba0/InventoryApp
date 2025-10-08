import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { CurrencyDollarIcon, CubeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import Card from "../components/Card";

const COLORS = ["#4ade80", "#3b82f6", "#facc15", "#f87171", "#a78bfa", "#f97316"];

export default function ManagerDashboard({ user }) {
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [salesByCashier, setSalesByCashier] = useState([]);
  const [filter, setFilter] = useState("daily");
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalProductsSold: 0,
    totalOrders: 0,
  });

  // Fetch sales data & aggregate
  const fetchChartsData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/sales-report/preview/${filter}`
      );
      const sales = res.data || [];

      setSalesData(aggregateSalesOverTime(sales));
      setTopProducts(aggregateTopProducts(sales));
      setSalesByCashier(aggregateSalesByCashier(sales));
      setSummary(calculateSummary(sales));
    } catch (err) {
      console.error("Error fetching sales data:", err);
      setSalesData([]);
      setTopProducts([]);
      setSalesByCashier([]);
      setSummary({ totalRevenue: 0, totalProductsSold: 0, totalOrders: 0 });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChartsData();
  }, [filter]);

  // -----------------------
  // Aggregation helpers
  // -----------------------
  const aggregateSalesOverTime = (sales) => {
    const map = {};
    sales.forEach((s) => {
      const date = new Date(s.date).toLocaleDateString();
      map[date] = (map[date] || 0) + Number(s.total_price || 0);
    });
    return Object.entries(map).map(([date, total]) => ({ date, total }));
  };

  const aggregateTopProducts = (sales) => {
    const map = {};
    sales.forEach((s) => {
      map[s.product_name] = map[s.product_name] || { qty: 0, revenue: 0 };
      map[s.product_name].qty += Number(s.quantity_sold || 0);
      map[s.product_name].revenue += Number(s.total_price || 0);
    });
    return Object.entries(map)
      .map(([name, data]) => ({ name, qty: data.qty, revenue: data.revenue }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 10);
  };

  const aggregateSalesByCashier = (sales) => {
    const map = {};
    sales.forEach((s) => {
      map[s.cashier_name] = map[s.cashier_name] || 0;
      map[s.cashier_name] += Number(s.total_price || 0);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  };

  const calculateSummary = (sales) => {
    let totalRevenue = 0;
    let totalProductsSold = 0;
    let totalOrders = sales.length || 0;

    sales.forEach((s) => {
      totalRevenue += Number(s.total_price || 0);
      totalProductsSold += Number(s.quantity_sold || 0);
    });

    return { totalRevenue, totalProductsSold, totalOrders };
  };

  const totalRevenueRounded = Math.ceil(summary.totalRevenue / 1000) * 1000;

  // Custom tooltip for top products chart
  const TopProductsTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-semibold">{data.name}</p>
          <p>Quantity Sold: {data.qty.toLocaleString()}</p>
          <p>Revenue: ₦{Math.ceil(data.revenue).toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Filter */}
      <div className="flex items-center gap-4 mb-6">
        <label className="font-semibold">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <CurrencyDollarIcon className="h-12 w-12 text-green-500" />
          <div>
            <span className="text-gray-500 font-semibold">Total Revenue</span>
            <p className="text-2xl font-bold text-green-600">
              ₦{totalRevenueRounded.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <CubeIcon className="h-12 w-12 text-blue-500" />
          <div>
            <span className="text-gray-500 font-semibold">Products Sold</span>
            <p className="text-2xl font-bold text-blue-600">
              {summary.totalProductsSold.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <ShoppingCartIcon className="h-12 w-12 text-purple-500" />
          <div>
            <span className="text-gray-500 font-semibold">Total Orders</span>
            <p className="text-2xl font-bold text-purple-600">
              {summary.totalOrders.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      {loading ? (
        <p>Loading charts...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart */}
          <Card title="Sales Over Time">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#4ade80"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Bar Chart */}
          <Card title="Top Selling Products">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={TopProductsTooltip} />
                <Bar dataKey="qty" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Pie Chart */}
          <Card title="Sales by Cashier" className="md:col-span-2">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={salesByCashier}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={(entry) => `${entry.name}: ₦${entry.value.toLocaleString()}`}
                >
                  {salesByCashier.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" />
                <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}
    </div>
  );
}
