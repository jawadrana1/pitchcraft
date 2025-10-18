import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-md text-white border-b border-white/20">
      {/* Brand */}
      <Link to="/" className="font-bold text-teal-400 text-2xl tracking-wide">
        PitchCraft
      </Link>

      {/* Navigation Links */}
      <div className="space-x-6 font-medium">
        <Link to="/" className="hover:text-teal-400 transition">Create Pitch</Link>

        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-teal-400 transition">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-red-400 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-teal-400 transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-teal-400 transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
