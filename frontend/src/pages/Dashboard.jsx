import { useEffect, useState } from "react";
import ManagerDashboard from "./ManagerDashboard";
import CashierDashboard from "./CashierDashboard";

function Dashboard() {
  const [user, setUser] = useState(() => {
    // Always load from localStorage at start
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Re-check user info every time the token changes
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      

      {user.role === "manager" ? <ManagerDashboard user={user} /> : <CashierDashboard user={user} />}
    </div>
  );
}

export default Dashboard;
