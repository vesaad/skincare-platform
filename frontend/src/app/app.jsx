import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../shared/components/navbar";

const Home = lazy(() => import("../features/home/home"));
const Login = lazy(() => import("../features/auth/login"));
const Register = lazy(() => import("../features/auth/register"));
const ProductExplorer = lazy(() => import("../features/products/product-explorer"));
const Quiz = lazy(() => import("../features/assessment/quiz"));
const Routine = lazy(() => import("../features/routines/routine"));
const Dashboard = lazy(() => import("../features/routines/dashboard"));
const AdminLayout = lazy(() => import("../features/admin/admin-layout"));
const AdminDashboard = lazy(() => import("../features/admin/dashboard"));
const UsersPage = lazy(() => import("../features/admin/users-page"));
const ProductsPage = lazy(() => import("../features/admin/products-page"));

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
