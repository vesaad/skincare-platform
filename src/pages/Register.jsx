import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/register", data);
      navigate("/login");
    } catch {
      alert("Gabim gjatë regjistrimit — provo sërish");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-96 flex flex-col gap-4">
        <div className="text-center mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-xl font-bold">S</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Krijo llogari</h1>
          <p className="text-gray-400 text-sm mt-1">
            Fillo udhëtimin tënd të kujdesit
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex gap-3">
            <input
              {...register("firstName")}
              placeholder="Emri"
              className="border border-gray-200 p-3 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <input
              {...register("lastName")}
              placeholder="Mbiemri"
              className="border border-gray-200 p-3 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            className="border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            {...register("password")}
            placeholder="Fjalëkalim"
            type="password"
            className="border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

          <button className="bg-gradient-to-r from-purple-500 to-pink-400 text-white p-3 rounded-xl font-semibold hover:opacity-90 transition mt-1">
            Regjistrohu
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Ke llogari?{" "}
          <Link
            to="/login"
            className="text-purple-500 font-medium hover:text-purple-700"
          >
            Hyr këtu
          </Link>
        </p>
      </div>
    </div>
  );
}
