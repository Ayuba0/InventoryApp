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

  const links = role === "manager" ? managerLinks : cashierLinks;

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">{role.toUpperCase()}</h2>
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
