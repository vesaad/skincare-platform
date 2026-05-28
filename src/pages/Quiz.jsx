import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { setRoutine, setProfile, setLoading } from "../store/slices/routineSlice";

const TOTAL_STEPS = 8;

const AGE_OPTIONS = [
  { label: "Under 18", value: 16 },
  { label: "18–24", value: 22 },
  { label: "25–34", value: 30 },
  { label: "35–44", value: 40 },
  { label: "45–54", value: 50 },
  { label: "55+", value: 60 },
];

const SKIN_TYPES = [
  { label: "Dry", emoji: "🏜️" },
  { label: "Oily", emoji: "💧" },
  { label: "Combination", emoji: "⚖️" },
  { label: "Sensitive", emoji: "🌸" },
  { label: "Normal", emoji: "✨" },
];

const SKIN_TONES = [
  { label: "Light", color: "bg-amber-100 border-amber-300" },
  { label: "Medium", color: "bg-amber-400 border-amber-600" },
  { label: "Dark", color: "bg-amber-800 border-amber-900" },
];

const CLIMATES = ["Humid", "Dry", "Temperate"];
const DIETS = ["Balanced", "Vegan", "High Sugar", "High Fat"];
const HORMONAL = ["Stable", "Fluctuating", "Teen", "Pregnant", "PCOS"];
const BUDGETS = [
  { label: "Low", desc: "Under $30/month" },
  { label: "Medium", desc: "$30–$80/month" },
  { label: "High", desc: "$80+/month" },
];

const SEVERITY_FIELDS = [
  { key: "Acne_Severity", label: "Acne" },
  { key: "Dryness_Severity", label: "Dryness" },
  { key: "Pigmentation_Severity", label: "Pigmentation" },
  { key: "Aging_Severity", label: "Aging" },
  { key: "Sensitivity_Severity", label: "Sensitivity" },
];

export default function Quiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [answers, setAnswers] = useState({
    Age: null,
    Skin_Type: null,
    Skin_Tone: null,
    Climate: null,
    Diet: null,
    Hormonal_Status: null,
    Budget_Level: null,
    Acne_Severity: 0,
    Dryness_Severity: 0,
    Pigmentation_Severity: 0,
    Aging_Severity: 0,
    Sensitivity_Severity: 0,
  });

  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const pick = (key, value) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    if (step < 7) {
      setTimeout(goNext, 280);
    }
  };

  const buildPayload = () => ({
    Age: answers.Age,
    Skin_Type: answers.Skin_Type,
    Skin_Tone: answers.Skin_Tone,
    Climate: answers.Climate,
    Diet: answers.Diet,
    Hormonal_Status: answers.Hormonal_Status,
    Budget_Level: answers.Budget_Level,
    Acne_Severity: answers.Acne_Severity * 2,
    Dryness_Severity: answers.Dryness_Severity * 2,
    Pigmentation_Severity: answers.Pigmentation_Severity * 2,
    Aging_Severity: answers.Aging_Severity * 2,
    Sensitivity_Severity: answers.Sensitivity_Severity * 2,
  });

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    dispatch(setLoading(true));
    try {
      const payload = buildPayload();
      const res = await api.post("/assessment", payload);
      dispatch(setProfile({ ...answers, ...payload }));
      dispatch(setRoutine(res.data));
      navigate("/routine");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Could not generate your routine. Is the ML service running?",
      );
      dispatch(setLoading(false));
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-[#faf9f7] flex flex-col">
      <div className="max-w-xl mx-auto w-full px-6 pt-10 pb-16 flex-1 flex flex-col">
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Skin assessment</span>
            <span>
              {step + 1} of {TOTAL_STEPS}
            </span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden">
          <div
            key={step}
            className={`transition-all duration-400 ease-out ${
              direction >= 0
                ? "animate-[slideIn_0.35s_ease-out]"
                : "animate-[slideIn_0.35s_ease-out]"
            }`}
            style={{
              animation: "slideIn 0.35s ease-out",
            }}
          >
            {step === 0 && (
              <Question title="How old are you?" subtitle="This helps personalize your routine">
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {AGE_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.label}
                      selected={answers.Age === opt.value}
                      onClick={() => pick("Age", opt.value)}
                    >
                      {opt.label}
                    </OptionCard>
                  ))}
                </div>
              </Question>
            )}

            {step === 1 && (
              <Question title="What is your skin type?" subtitle="Choose the closest match">
                <div className="grid grid-cols-1 gap-3 mt-6">
                  {SKIN_TYPES.map((opt) => (
                    <OptionCard
                      key={opt.label}
                      selected={answers.Skin_Type === opt.label}
                      onClick={() => pick("Skin_Type", opt.label)}
                    >
                      <span className="text-2xl mr-3">{opt.emoji}</span>
                      {opt.label}
                    </OptionCard>
                  ))}
                </div>
              </Question>
            )}

            {step === 2 && (
              <Question title="What is your skin tone?" subtitle="Tap the shade that fits best">
                <div className="flex justify-center gap-6 mt-10">
                  {SKIN_TONES.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => pick("Skin_Tone", opt.label)}
                      className={`flex flex-col items-center gap-3 group`}
                    >
                      <div
                        className={`w-16 h-16 rounded-full border-4 transition-all ${opt.color} ${
                          answers.Skin_Tone === opt.label
                            ? "ring-4 ring-gray-900 ring-offset-2 scale-110"
                            : "opacity-80 group-hover:scale-105"
                        }`}
                      />
                      <span className="text-sm text-gray-600">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </Question>
            )}

            {step === 3 && (
              <Question title="What climate do you live in?">
                <div className="grid grid-cols-1 gap-3 mt-6">
                  {CLIMATES.map((c) => (
                    <OptionCard
                      key={c}
                      selected={answers.Climate === c}
                      onClick={() => pick("Climate", c)}
                    >
                      {c}
                    </OptionCard>
                  ))}
                </div>
              </Question>
            )}

            {step === 4 && (
              <Question title="How would you describe your diet?">
                <div className="grid grid-cols-1 gap-3 mt-6">
                  {DIETS.map((d) => (
                    <OptionCard
                      key={d}
                      selected={answers.Diet === d}
                      onClick={() => pick("Diet", d)}
                    >
                      {d}
                    </OptionCard>
                  ))}
                </div>
              </Question>
            )}

            {step === 5 && (
              <Question title="What is your hormonal status?">
                <div className="grid grid-cols-1 gap-3 mt-6">
                  {HORMONAL.map((h) => (
                    <OptionCard
                      key={h}
                      selected={answers.Hormonal_Status === h}
                      onClick={() => pick("Hormonal_Status", h)}
                    >
                      {h}
                    </OptionCard>
                  ))}
                </div>
              </Question>
            )}

            {step === 6 && (
              <Question title="What is your skincare budget?">
                <div className="grid grid-cols-1 gap-3 mt-6">
                  {BUDGETS.map((b) => (
                    <OptionCard
                      key={b.label}
                      selected={answers.Budget_Level === b.label}
                      onClick={() => pick("Budget_Level", b.label)}
                    >
                      <div className="text-left">
                        <p className="font-semibold">{b.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{b.desc}</p>
                      </div>
                    </OptionCard>
                  ))}
                </div>
              </Question>
            )}

            {step === 7 && (
              <Question
                title="Rate your skin concerns"
                subtitle="0 = none, 5 = severe"
              >
                <div className="mt-8 space-y-6">
                  {SEVERITY_FIELDS.map(({ key, label }) => (
                    <div key={key}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {label}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {answers[key]}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={5}
                        step={1}
                        value={answers[key]}
                        onChange={(e) =>
                          setAnswers((a) => ({
                            ...a,
                            [key]: parseInt(e.target.value, 10),
                          }))
                        }
                        className="w-full accent-gray-900"
                      />
                    </div>
                  ))}
                </div>
                {error && (
                  <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
                )}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="mt-10 w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {submitting ? "Building your routine…" : "See My Routine →"}
                </button>
              </Question>
            )}
          </div>
        </div>

        {step > 0 && step < 7 && (
          <button
            type="button"
            onClick={() => {
              setDirection(-1);
              setStep((s) => s - 1);
            }}
            className="mt-6 text-sm text-gray-400 hover:text-gray-700"
          >
            ← Back
          </button>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function Question({ title, subtitle, children }) {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-400 mt-2 text-sm md:text-base">{subtitle}</p>
      )}
      {children}
    </div>
  );
}

function OptionCard({ children, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-center px-5 py-4 rounded-2xl border text-sm font-medium transition-all duration-200 ${
        selected
          ? "border-gray-900 bg-gray-900 text-white shadow-md"
          : "border-gray-200 bg-white text-gray-800 hover:border-gray-400 hover:shadow-sm"
      }`}
    >
      {children}
    </button>
  );
}
