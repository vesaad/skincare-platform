import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

export default function Navbar() {
  const { isAuthenticated } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center">
          <span className="text-white text-sm font-bold">S</span>
        </div>
        <div>
          <Link to="/" className="text-lg font-bold text-gray-900">
            SkinCare AI
          </Link>
          <p className="text-xs text-purple-400 -mt-1">Intelligence Platform</p>
        </div>
      </div>

      <div className="flex gap-1 items-center">
        <Link
          to="/products"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isActive("/products") ? "bg-purple-50 text-purple-600" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
        >
          Produkte
        </Link>
        {isAuthenticated ? (
          <>
            <Link
              to="/quiz"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isActive("/quiz") ? "bg-purple-50 text-purple-600" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
            >
              Quiz
            </Link>
            <Link
              to="/routine"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isActive("/routine") ? "bg-purple-50 text-purple-600" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
            >
              Rutina
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isActive("/dashboard") ? "bg-purple-50 text-purple-600" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-500 hover:bg-red-100 transition"
            >
              Dil
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Hyr
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-400 text-white hover:opacity-90 transition"
            >
              Regjistrohu
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
