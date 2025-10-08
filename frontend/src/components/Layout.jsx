import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Redirect if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  // Sidebar links based on role
  const managerLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Products", path: "/products" },
    { name: "Sales", path: "/sales" },
    { name: "Reports", path: "/report" },
  ];

  const cashierLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Process Sale", path: "/sales" },
    { name: "Recent Transactions", path: "/report" },
  ];

  const links = user?.role === "manager" ? managerLinks : cashierLinks;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">
          {user ? `${user.role.toUpperCase()} PANEL` : "INVENTORY APP"}
        </h2>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="block p-2 rounded hover:bg-gray-700 transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <header className="flex justify-between items-center bg-white p-4 shadow rounded mb-6">
          <h1 className="text-xl font-bold">
            Welcome, {user ? user.name : "User"}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </header>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
