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

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((s) => s.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={<div className="p-8 text-center">Duke u ngarkuar...</div>}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductExplorer />} />
          <Route
            path="/quiz"
            element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/routine"
            element={
              <PrivateRoute>
                <Routine />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}
