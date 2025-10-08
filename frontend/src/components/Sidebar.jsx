import { Link } from "react-router-dom";

function Sidebar({ role }) {
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

  // Default to cashier if role is missing
  const links = role === "manager" ? managerLinks : cashierLinks;
  const displayRole = role?.toUpperCase() || "USER";

  return (
    <div className="w-64 bg-purple-800 text-white min-h-screen p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">{displayRole}</h2>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="hover:bg-gray-700 p-2 rounded"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
