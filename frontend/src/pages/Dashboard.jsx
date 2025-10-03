import { useEffect, useState } from "react";
import ManagerDashboard from "./ManagerDashboard";
import CashierDashboard from "./CashierDashboard";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage (after login we store it)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Welcome {user.name} ({user.role})
      </h2>

      {user.role === "manager" ? <ManagerDashboard /> : <CashierDashboard />}
    </div>
  );
}

export default Dashboard;