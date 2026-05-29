import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ProductExplorer = lazy(() => import("./pages/ProductExplorer"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Routine = lazy(() => import("./pages/Routine"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const UsersPage = lazy(() => import("./pages/admin/UsersPage"));
const ProductsPage = lazy(() => import("./pages/admin/ProductsPage"));

const S = ({ children }) => (
  <Suspense fallback={<div className="p-8 text-center">Duke u ngarkuar...</div>}>
    {children}
  </Suspense>
);

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((s) => s.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.role !== 'Admin') return <Navigate to="/" />;
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<><Navbar /><S><Home /></S></>} />
      <Route path="/login" element={<><Navbar /><S><Login /></S></>} />
      <Route path="/register" element={<><Navbar /><S><Register /></S></>} />
      <Route path="/products" element={<><Navbar /><S><ProductExplorer /></S></>} />
      <Route path="/quiz" element={<PrivateRoute><><Navbar /><S><Quiz /></S></></PrivateRoute>} />
      <Route path="/routine" element={<PrivateRoute><><Navbar /><S><Routine /></S></></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><><Navbar /><S><Dashboard /></S></></PrivateRoute>} />

      <Route path="/admin" element={
        <AdminRoute>
          <S><AdminLayout /></S>
        </AdminRoute>
      }>
        <Route index element={<S><AdminDashboard /></S>} />
        <Route path="users" element={<S><UsersPage /></S>} />
        <Route path="products" element={<S><ProductsPage /></S>} />
      </Route>
    </Routes>
  );
}