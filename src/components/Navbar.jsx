import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { resetRoutine } from "../store/slices/routineSlice";

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(resetRoutine());
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/40 bg-white/55 px-4 py-3 shadow-sm shadow-black/5 backdrop-blur-2xl md:px-8">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center">
          <span className="rounded-full bg-white/55 p-1.5 shadow-sm shadow-[#8b7a6d]/10 ring-1 ring-white/70 backdrop-blur-xl">
            <img
              src="/images/aura-emblem-logo.png"
              alt="AuraSkin emblem"
              className="h-12 w-12 rounded-full object-cover object-center md:h-14 md:w-14"
            />
          </span>
          <span className="ml-3 hidden leading-tight sm:block">
            <span className="block text-base font-semibold text-[#151712]">AuraSkin</span>
            <span className="block text-xs font-medium text-[#844D63]">Personalized Skincare</span>
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-1">
        <Link
          to="/products"
          className={`hidden rounded-full px-4 py-2 text-sm font-medium transition sm:inline-flex ${isActive("/products") ? "bg-white/80 text-[#151712] shadow-sm" : "text-gray-500 hover:bg-white/70 hover:text-gray-900"}`}
        >
          Produkte
        </Link>
        <Link
          to="/quiz"
          className={`rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide shadow-sm backdrop-blur transition md:text-sm ${isActive("/quiz") ? "bg-[#151712] text-white" : "bg-[#151712]/90 text-white hover:bg-[#303326]"}`}
        >
          Take Quiz
        </Link>

        {isAuthenticated ? (
          <>
            <Link
              to="/routine"
              className={`hidden rounded-full px-4 py-2 text-sm font-medium transition md:inline-flex ${isActive("/routine") ? "bg-white/80 text-[#151712] shadow-sm" : "text-gray-500 hover:bg-white/70 hover:text-gray-900"}`}
            >
              Rutina
            </Link>
            <Link
              to="/dashboard"
              className={`hidden rounded-full px-4 py-2 text-sm font-medium transition lg:inline-flex ${isActive("/dashboard") ? "bg-white/80 text-[#151712] shadow-sm" : "text-gray-500 hover:bg-white/70 hover:text-gray-900"}`}
            >
              Dashboard
            </Link>

            {user?.role === 'Admin' && (
              <Link
                to="/admin"
                className={`hidden rounded-full px-4 py-2 text-sm font-medium transition lg:inline-flex ${isActive("/admin") ? "bg-[#844D63] text-white shadow-sm" : "text-[#844D63] hover:bg-white/70"}`}
              >
                Admin Panel
              </Link>
            )}

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
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 sm:inline-flex"
            >
              Hyr
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-[#844D63] shadow-sm ring-1 ring-white/60 transition hover:bg-white"
            >
              Regjistrohu
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
