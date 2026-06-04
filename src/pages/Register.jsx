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
      alert("Gabim gjate regjistrimit. Provo serish.");
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-86px)] items-center justify-center bg-[#f7f3ec] px-4 py-10 text-[#151712]">
      <div className="w-full max-w-md rounded-[2rem] border border-[#eadfd9] bg-white p-6 shadow-lg shadow-[#8b7a6d]/10 md:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-semibold">Krijo llogari</h1>
          <p className="mt-2 text-sm text-[#77766d]">
            Regjistrohu per te krijuar rutinen tende.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-[#4d5047]">
              Emri
              <input
                {...register("firstName")}
                required
                className="mt-2 w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
              />
            </label>
            <label className="text-sm font-medium text-[#4d5047]">
              Mbiemri
              <input
                {...register("lastName")}
                required
                className="mt-2 w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-[#4d5047]">
            Email
            <input
              {...register("email")}
              type="email"
              required
              className="mt-2 w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
            />
          </label>

          <label className="block text-sm font-medium text-[#4d5047]">
            Fjalekalimi
            <input
              {...register("password")}
              type="password"
              required
              className="mt-2 w-full rounded-xl border border-[#ddd4ce] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
            />
          </label>

          <button className="mt-2 w-full rounded-full bg-[#151712] px-5 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#303326]">
            Regjistrohu
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#77766d]">
          Ke llogari?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#844D63] hover:text-[#65394b]"
          >
            Hyr ketu
          </Link>
        </p>
      </div>
    </main>
  );
}
