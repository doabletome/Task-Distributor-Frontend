import { FaBars, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Navbar component (mobile-only, hidden on large screens)
export default function Navbar({ onMenuClick }) {
  const nav = useNavigate();

  // Logout function clears localStorage and redirects to login
  const logout = () => {
    localStorage.clear();
    nav("/login");
  };

  return (
    <header className="flex items-center justify-between bg-white shadow p-4 lg:hidden">
      {/* Menu icon (hamburger) - visible on mobile */}
      <button onClick={onMenuClick} className="p-2">
        <FaBars size={24} />
      </button>

      {/* Page title */}
      <h1 className="text-xl font-bold">Dashboard</h1>

      {/* Logout button with icon */}
      <button
        onClick={logout}
        className="p-2 flex justify-center items-center gap-2"
      >
        <FaUserCircle size={24} />
        Logout
      </button>
    </header>
  );
}
