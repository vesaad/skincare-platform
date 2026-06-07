import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/slices/authSlice";
import { resetRoutine, setSavedRoutineId } from "../store/slices/routineSlice";
import api from "../services/api";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      dispatch(resetRoutine());
      dispatch(loginSuccess(res.data));

      try {
        const routineRes = await api.get("/routines/active");
        if (routineRes.data) {
          dispatch(setSavedRoutineId(routineRes.data.id));
          navigate("/routine");
        } else {
          navigate("/quiz");
        }
      } catch {
        navigate("/quiz");
      }
    } catch {
      alert("Email ose fjalekalim i gabuar");
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-86px)] items-center justify-center bg-[#f7f3ec] px-4 py-10 text-[#151712]">
      <div className="w-full max-w-md rounded-[2rem] border border-[#eadfd9] bg-white p-6 shadow-lg shadow-[#8b7a6d]/10 md:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-semibold">Welcome back!</h1>
          <p className="mt-2 text-sm text-[#77766d]">
            Hyr ne llogari per te vazhduar rutinen tende.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="block text-sm font-medium text-[#4d5047]">
            Email
            <input
              {...register("email")}
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
            />
          </label>

          <label className="block text-sm font-medium text-[#4d5047]">
            Fjalekalimi
            <input
              {...register("password")}
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
            />
          </label>

          <button className="mt-2 w-full rounded-full bg-[#151712] px-5 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#303326]">
            Hyr
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#77766d]">
          Nuk ke llogari?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#844D63] hover:text-[#65394b]"
          >
            Regjistrohu
          </Link>
        </p>
      </div>
    </main>
  );
}
