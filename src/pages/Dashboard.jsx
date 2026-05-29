import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../services/api";

const PROFILE_LABELS = {
  Age: "Age",
  Skin_Type: "Skin type",
  Skin_Tone: "Skin tone",
  Climate: "Climate",
  Diet: "Diet",
  Hormonal_Status: "Hormonal status",
  Budget_Level: "Budget",
};

function RoutineCard({ step, index }) {
  return (
    <article className="rounded-[1.75rem] border border-white/75 bg-white/60 p-4 shadow-sm shadow-black/5 backdrop-blur-xl">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ead5dd] text-sm font-bold text-[#844D63]">
          {index + 1}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#844D63]">
            {step.step || "Routine step"}
          </p>
          <h3 className="mt-2 truncate text-base font-semibold text-[#151712]">
            {step.name || "Product recommendation"}
          </h3>
          <p className="mt-1 text-sm text-[#8b8a7f]">{step.brand || "AuraSkin"}</p>
          {step.price != null && (
            <p className="mt-3 text-sm font-bold text-[#151712]">${step.price}</p>
          )}
        </div>
      </div>
    </article>
  );
}

function MetricTile({ label, value, helper }) {
  return (
    <div className="rounded-[1.75rem] border border-white/75 bg-white/55 p-5 shadow-sm backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#844D63]">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-[#151712]">{value}</p>
      {helper && <p className="mt-1 text-sm text-[#8b8a7f]">{helper}</p>}
    </div>
  );
}

export default function Dashboard() {
  const { user } = useSelector((s) => s.auth);
  const { data: routine, profile, savedRoutineId } = useSelector((s) => s.routine);
  const [activeRoutine, setActiveRoutine] = useState(null);
  const [logs, setLogs] = useState([]);
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState("");
  const [logDate, setLogDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );
  const [savingLog, setSavingLog] = useState(false);

  const routineId = savedRoutineId || activeRoutine?.id;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/routines/active");
        if (res.data) {
          setActiveRoutine(res.data);
          setLogs(res.data.progressLogs || []);
        }
      } catch {
        /* User may not have saved a routine yet. */
      }
    };

    load();
  }, [savedRoutineId]);

  const steps =
    activeRoutine?.routineSteps?.map((s) => ({
      step: s.instructions || s.product?.category,
      name: s.product?.name,
      brand: s.product?.brand,
      price: s.product?.price,
      ingredients: (s.product?.ingredients || "").split("|").filter(Boolean),
    })) || routine?.products || [];

  const routineName =
    activeRoutine?.name || routine?.routine || (steps.length ? "Active Routine" : null);

  const profileEntries = useMemo(
    () =>
      profile
        ? Object.entries(PROFILE_LABELS)
            .filter(([key]) => profile[key] != null)
            .map(([key, label]) => ({
              label,
              value:
                key === "Age" && typeof profile[key] === "number"
                  ? profile[key]
                  : String(profile[key]),
            }))
        : [],
    [profile],
  );

  const averageRating =
    logs.length > 0
      ? (logs.reduce((sum, log) => sum + (log.rating || 0), 0) / logs.length).toFixed(1)
      : "0.0";

  const handleLogProgress = async () => {
    if (!routineId) {
      alert("Save your routine first from the Routine page.");
      return;
    }

    setSavingLog(true);
    try {
      const res = await api.post("/progress-logs", {
        routineId,
        rating,
        notes: notes ? `[${logDate}] ${notes}` : `[${logDate}]`,
      });
      setLogs((prev) => [res.data, ...prev]);
      setNotes("");
    } catch (err) {
      alert(err.response?.data?.error || "Could not save progress");
    } finally {
      setSavingLog(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ec] text-[#151712]">
      <section className="relative px-4 py-10 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_8%,rgba(132,77,99,0.16),transparent_30%),radial-gradient(circle_at_90%_14%,rgba(184,146,95,0.18),transparent_32%),linear-gradient(135deg,#fbf8f4_0%,#f7f3ec_52%,#efe7df_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
            <div className="rounded-[3rem] border border-white/70 bg-white/45 p-6 shadow-2xl shadow-[#8b7a6d]/15 backdrop-blur-2xl md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#844D63]">
                AuraSkin dashboard
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
                Welcome back, {user?.firstName || "there"}.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#62665d]">
                Track your routine, skin profile, and progress in one calm,
                polished workspace.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/quiz"
                  className="rounded-full bg-[#151712]/90 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#303326]"
                >
                  Retake quiz
                </Link>
                <Link
                  to="/products"
                  className="rounded-full border border-white/80 bg-white/65 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#844D63] shadow-sm backdrop-blur-xl transition hover:bg-white"
                >
                  Browse products
                </Link>
              </div>
            </div>

            <aside className="rounded-[3rem] border border-white/70 bg-white/35 p-6 shadow-xl shadow-black/5 backdrop-blur-2xl md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#844D63]">
                Today
              </p>
              <p className="mt-4 text-5xl font-semibold text-[#151712]">
                {averageRating}
              </p>
              <p className="mt-2 text-sm text-[#62665d]">
                Average progress rating from your saved logs.
              </p>
              <div className="mt-6 rounded-[2rem] bg-[#151712]/90 p-5 text-white">
                <p className="text-sm font-semibold">Next best action</p>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  {steps.length
                    ? "Log how your skin feels today so your progress history stays useful."
                    : "Take the quiz and save a routine to unlock progress tracking."}
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <MetricTile
              label="Routine"
              value={routineName ? "Active" : "Not set"}
              helper={routineName || "Take the quiz to begin"}
            />
            <MetricTile
              label="Products"
              value={steps.length}
              helper="Recommended routine steps"
            />
            <MetricTile
              label="Logs"
              value={logs.length}
              helper="Recent skin check-ins"
            />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.42fr]">
            <section className="rounded-[3rem] border border-white/70 bg-white/45 p-6 shadow-xl shadow-black/5 backdrop-blur-2xl md:p-8">
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#844D63]">
                    Current routine
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">
                    {routineName || "No routine saved yet"}
                  </h2>
                </div>
                <Link
                  to="/routine"
                  className="w-fit rounded-full border border-white/80 bg-white/65 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#844D63] shadow-sm transition hover:bg-white"
                >
                  View details
                </Link>
              </div>

              {steps.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {steps.map((step, index) => (
                    <RoutineCard
                      key={`${step.step}-${step.name}-${index}`}
                      step={step}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-[2rem] border border-white/75 bg-white/55 p-6 text-[#62665d]">
                  No routine saved yet. Start with the quiz to create your plan.
                </div>
              )}
            </section>

            <section className="rounded-[3rem] border border-white/70 bg-white/35 p-6 shadow-xl shadow-black/5 backdrop-blur-2xl md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#844D63]">
                Skin profile
              </p>
              <h2 className="mt-2 text-3xl font-semibold">Profile snapshot</h2>
              {profileEntries.length > 0 ? (
                <div className="mt-6 grid gap-3">
                  {profileEntries.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.4rem] border border-white/75 bg-white/60 p-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b948a]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-[#151712]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-sm leading-6 text-[#62665d]">
                  Complete the quiz to see your profile here.
                </p>
              )}
            </section>
          </div>

          <section className="mt-8 rounded-[3rem] border border-white/70 bg-white/45 p-6 shadow-xl shadow-black/5 backdrop-blur-2xl md:p-8">
            <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#844D63]">
                  Progress log
                </p>
                <h2 className="mt-2 text-3xl font-semibold">
                  Track how your skin feels.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#62665d]">
                Add a quick rating and note after using your routine. Your latest
                entries stay easy to scan below.
              </p>
            </div>

            <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[2.25rem] border border-white/75 bg-[#fbf8f4]/80 p-5 shadow-sm">
                <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#844D63]">
                    Date
                    <input
                      type="date"
                      value={logDate}
                      onChange={(e) => setLogDate(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[#eadfd9] bg-white/85 px-4 py-3 text-sm text-[#151712] outline-none focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
                    />
                  </label>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#844D63]">
                      Skin feel rating
                    </p>
                    <div className="mt-2 grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setRating(n)}
                          className={`rounded-2xl border px-3 py-3 text-sm font-bold transition ${
                            rating === n
                              ? "border-[#844D63] bg-[#844D63] text-white shadow-lg shadow-[#844D63]/20"
                              : "border-white/80 bg-white/75 text-[#844D63] hover:bg-white"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-[#8b8a7f]">
                      1 = irritated, 5 = calm and balanced
                    </p>
                  </div>
                </div>

                <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.16em] text-[#844D63]">
                  Notes
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Example: less redness today, skin feels hydrated."
                    rows="4"
                    className="mt-2 w-full resize-none rounded-2xl border border-[#eadfd9] bg-white/85 px-4 py-3 text-sm text-[#151712] outline-none placeholder:text-[#aaa397] focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
                  />
                </label>

                <button
                  type="button"
                  onClick={handleLogProgress}
                  disabled={savingLog}
                  className="mt-5 w-full rounded-full bg-[#151712]/90 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#303326] disabled:opacity-50"
                >
                  {savingLog ? "Saving..." : "Save check-in"}
                </button>
              </div>

              <div className="rounded-[2.25rem] border border-white/75 bg-white/55 p-5 shadow-sm backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#844D63]">
                      Recent check-ins
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">
                      Your progress history
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#ead5dd] px-4 py-2 text-sm font-semibold text-[#844D63]">
                    {logs.length}
                  </span>
                </div>

                <div className="mt-5 max-h-[360px] space-y-3 overflow-y-auto pr-1">
                  {logs.length === 0 ? (
                    <div className="rounded-[1.5rem] bg-white/70 p-5 text-sm text-[#62665d]">
                      No check-ins yet. Add your first one on the left.
                    </div>
                  ) : (
                    logs.map((log) => (
                      <div
                        key={log.id}
                        className="grid gap-4 rounded-[1.5rem] border border-white/80 bg-white/80 p-4 sm:grid-cols-[84px_1fr]"
                      >
                        <div className="rounded-2xl bg-[#151712]/90 p-3 text-center text-white">
                          <p className="text-2xl font-semibold">
                            {log.rating || 0}
                          </p>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65">
                            out of 5
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9b948a]">
                            {new Date(log.loggedAt).toLocaleDateString()}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[#4d5047]">
                            {(log.notes || "No notes added.").replace(
                              /^\[[^\]]+\]\s*/,
                              "",
                            )}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
