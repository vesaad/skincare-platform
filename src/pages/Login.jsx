import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/slices/authSlice";
import api from "../services/api";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      dispatch(loginSuccess(res.data));
      navigate("/dashboard");
    } catch {
      alert("Email ose fjalëkalim i gabuar");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow w-96 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Hyr në llogari</h1>
        <input
          {...register("email")}
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          {...register("password")}
          placeholder="Fjalëkalim"
          type="password"
          className="border p-2 rounded"
        />
        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Hyr
        </button>
      </form>
    </div>
  );
}
