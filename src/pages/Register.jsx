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
      alert("Gabim gjate regjistrimit - provo serish");
    }
  };

  return (
    <main className="relative flex min-h-[calc(100vh-96px)] items-center justify-center overflow-hidden bg-[#f7f3ec] px-4 py-3 text-[#151712] md:py-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(232,213,221,0.72),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(248,239,226,0.9),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.75),rgba(247,243,236,0.5))]" />

      <section className="relative grid w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/45 shadow-2xl shadow-[#8b7a6d]/15 backdrop-blur-2xl lg:grid-cols-[0.92fr_1.08fr]">
        <div className="hidden min-h-[520px] flex-col justify-between bg-[#151712] p-8 text-white lg:flex">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#ead5dd]">
              AuraSkin Intelligence
            </div>
            <h1 className="mt-7 text-4xl font-semibold leading-tight">
              Build a routine that feels clear from day one.
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/68">
              Create your profile, take the guided assessment, and save a
              personalized skincare routine shaped around your goals.
            </p>
          </div>

          <div className="grid gap-3 text-sm text-white/75">
            <div className="rounded-3xl border border-white/12 bg-white/8 p-4">
              <p className="font-semibold text-white">Personal profile</p>
              <p className="mt-1 text-xs leading-5 text-white/58">
                Skin type, sensitivity, goals, and routine preferences.
              </p>
            </div>
            <div className="rounded-3xl border border-white/12 bg-white/8 p-4">
              <p className="font-semibold text-white">Calm recommendations</p>
              <p className="mt-1 text-xs leading-5 text-white/58">
                Product matches without overwhelming skincare noise.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#844D63]">
              Join AuraSkin
            </p>
            <h1 className="mt-2 text-3xl font-semibold md:text-4xl">
              Krijo llogari
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#77766d]">
              Fillo udhetimin tend te kujdesit me nje profil personal dhe nje
              rutine qe kuptohet lehte.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-[#4d5047]">
                Emri
                <input
                  {...register("firstName")}
                  required
                  autoComplete="given-name"
                  className="mt-2 w-full rounded-2xl border border-[#ddd4ce] bg-white/80 px-4 py-3 text-sm outline-none transition placeholder:text-[#aaa397] focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
                />
              </label>
              <label className="block text-sm font-medium text-[#4d5047]">
                Mbiemri
                <input
                  {...register("lastName")}
                  required
                  autoComplete="family-name"
                  className="mt-2 w-full rounded-2xl border border-[#ddd4ce] bg-white/80 px-4 py-3 text-sm outline-none transition placeholder:text-[#aaa397] focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-[#4d5047]">
              Email
              <input
                {...register("email")}
                type="email"
                required
                autoComplete="email"
                className="mt-2 w-full rounded-2xl border border-[#ddd4ce] bg-white/80 px-4 py-3 text-sm outline-none transition placeholder:text-[#aaa397] focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
              />
            </label>

            <label className="block text-sm font-medium text-[#4d5047]">
              Fjalekalimi
              <input
                {...register("password")}
                type="password"
                required
                autoComplete="new-password"
                className="mt-2 w-full rounded-2xl border border-[#ddd4ce] bg-white/80 px-4 py-3 text-sm outline-none transition placeholder:text-[#aaa397] focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
              />
            </label>

            <button className="mt-2 w-full rounded-full bg-[#151712] px-5 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#303326]">
              Regjistrohu
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-[#77766d]">
            Ke llogari?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#844D63] hover:text-[#65394b]"
            >
              Hyr ketu
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
