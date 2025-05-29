import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

// Sidebar component for navigation and logout
export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  // Get user role from localStorage to conditionally label task link
  const role = localStorage.getItem("role"); // “agent” or “admin”

  // Define navigation links
  const links = [
    { to: "/agents", label: "Agents" },
    { to: "/upload", label: "Upload CSV" },
    {
      to: "/tasks",
      label: role === "agent" ? "My Tasks" : "Tasks Assignment", // Dynamic label
    },
  ];

  // Clear session and navigate to login page on logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
    onClose?.(); // Close sidebar on mobile
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 border-r z-20 transform bg-gray-800
        lg:static lg:translate-x-0 transition-transform duration-200
        ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
      `}
    >
      {/* Header (visible only on mobile) */}
      <div className="flex items-center justify-between p-4 lg:hidden bg-gray-800">
        <h2 className="text-xl font-bold text-white">Menu</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white transition"
        >
          ✕
        </button>
      </div>

      {/* Main navigation links */}
      <nav className="flex-1 flex flex-col justify-between">
        <div>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  "block px-6 py-3 rounded-md transition-colors mb-1",
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold" // Active style
                    : "text-white hover:bg-blue-50 hover:text-blue-600", // Inactive style
                ].join(" ")
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Logout button at bottom of sidebar */}
        <div className="border-t border-gray-700 mt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 rounded-md text-red-400 hover:bg-red-50 hover:text-red-600 transition mb-4"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}
