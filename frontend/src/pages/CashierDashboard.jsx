import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

function CashierDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="cashier" />
      <div className="flex-1 p-6">
        <Navbar />
        <h1 className="text-3xl font-bold mb-6">Cashier Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Process Sale" value="Quick Access" icon="🛒" />
          <Card title="Recent Transactions" value="View List" icon="🧾" />
          <Card title="End-of-Day Summary" value="Generate Report" icon="💰" />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Sales</h2>
          <div className="overflow-x-auto bg-white rounded shadow p-4">
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
                <tr>
                  <td className="border px-4 py-2">Product A</td>
                  <td className="border px-4 py-2">5</td>
                  <td className="border px-4 py-2">$100</td>
                  <td className="border px-4 py-2">2025-09-30</td>
                </tr>
                {/* Add dynamic rows from API */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashierDashboard;
