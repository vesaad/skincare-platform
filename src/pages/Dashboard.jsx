import { useEffect, useState } from "react";
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
        /* optional — user may not have saved routine yet */
      }
    };
    load();
  }, [savedRoutineId]);

  const displayRoutine = activeRoutine || (routine && savedRoutineId ? null : routine);
  const steps =
    activeRoutine?.routineSteps?.map((s) => ({
      step: s.instructions || s.product?.category,
      name: s.product?.name,
      brand: s.product?.brand,
      price: s.product?.price,
      ingredients: (s.product?.ingredients || "").split("|").filter(Boolean),
    })) || routine?.products || [];

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

  const profileEntries = profile
    ? Object.entries(PROFILE_LABELS)
        .filter(([key]) => profile[key] != null)
        .map(([key, label]) => ({
          label,
          value:
            key === "Age" && typeof profile[key] === "number"
              ? profile[key]
              : String(profile[key]),
        }))
    : [];

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-gray-900">
          Welcome back, {user?.firstName || "there"} 👋
        </h1>
        <p className="text-gray-400 mt-1">Your skincare command center</p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Current routine */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900">Current routine</h2>
              <Link to="/routine" className="text-sm text-purple-600 hover:underline">
                View details →
              </Link>
            </div>
            {steps.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {steps.map((p, i) => (
                  <div
                    key={i}
                    className="p-4 bg-purple-50 rounded-xl border border-purple-100"
                  >
                    <p className="text-xs text-purple-600 font-semibold uppercase">
                      {p.step}
                    </p>
                    <p className="font-medium text-gray-900 text-sm mt-1 truncate">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-400">{p.brand}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">
                No routine saved yet.{" "}
                <Link to="/quiz" className="text-purple-600">
                  Take the quiz
                </Link>
              </p>
            )}
            {(routine?.routine || activeRoutine?.name) && (
              <p className="mt-3 text-sm text-gray-500">
                {routine?.routine || activeRoutine?.name}
                {routine?.confidence != null && (
                  <span className="ml-2 text-purple-600 font-medium">
                    {routine.confidence}% confidence
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Skin profile */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Skin profile</h2>
            {profileEntries.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {profileEntries.map((p) => (
                  <div
                    key={p.label}
                    className="p-3 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <p className="text-xs text-gray-400">{p.label}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">
                      {p.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                Complete the{" "}
                <Link to="/quiz" className="text-purple-600">
                  quiz
                </Link>{" "}
                to see your profile.
              </p>
            )}
          </div>

          {/* Quick links */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Quick actions</h2>
            <div className="flex flex-col gap-2">
              <Link
                to="/quiz"
                className="px-4 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium text-center hover:bg-gray-800"
              >
                Retake quiz
              </Link>
              <Link
                to="/products"
                className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-center hover:bg-gray-50"
              >
                Browse products
              </Link>
            </div>
          </div>

          {/* Progress log */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Progress log</h2>
            <div className="flex flex-wrap gap-4 items-end mb-6">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Date</label>
                <input
                  type="date"
                  value={logDate}
                  onChange={(e) => setLogDate(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Rating (1–5)
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className={`w-9 h-9 rounded-lg text-sm border transition ${
                        rating >= n
                          ? "bg-yellow-100 border-yellow-300 text-yellow-700"
                          : "border-gray-200 text-gray-400"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs text-gray-500 block mb-1">Notes</label>
                <input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How is your skin today?"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={handleLogProgress}
                disabled={savingLog}
                className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
              >
                {savingLog ? "Saving…" : "Log progress"}
              </button>
            </div>
            <div className="space-y-2">
              {logs.length === 0 ? (
                <p className="text-sm text-gray-400">No logs yet.</p>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl text-sm"
                  >
                    <span className="text-yellow-500">
                      {"★".repeat(log.rating || 0)}
                    </span>
                    <span className="text-gray-600 flex-1">{log.notes || "—"}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(log.loggedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
