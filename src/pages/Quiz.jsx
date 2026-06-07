import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { resetRoutine, setRoutine, setProfile, setLoading, setSavedRoutineId } from "../store/slices/routineSlice";

const AGE_OPTIONS = [
  { label: "Under 18", value: 16 },
  { label: "18-24", value: 22 },
  { label: "25-34", value: 30 },
  { label: "35-44", value: 40 },
  { label: "45-54", value: 50 },
  { label: "55+", value: 60 },
];

const SKIN_TYPES = [
  { label: "Dry", note: "Feels tight or flaky" },
  { label: "Oily", note: "Gets shiny through the day" },
  { label: "Combination", note: "Oily in some areas, dry in others" },
  { label: "Sensitive", note: "Reacts easily to new products" },
  { label: "Normal", note: "Generally balanced" },
];

const SKIN_TONES = [
  { label: "Light", color: "bg-[#f5d8bd]" },
  { label: "Medium", color: "bg-[#c98c59]" },
  { label: "Dark", color: "bg-[#7b472f]" },
];

const CLIMATES = [
  { label: "Humid", note: "Warm or moisture-heavy air" },
  { label: "Dry", note: "Low moisture or cold air" },
  { label: "Temperate", note: "Balanced seasonal weather" },
];

const DIETS = [
  { label: "Balanced", note: "A steady mix of foods" },
  { label: "Vegan", note: "Plant-based routine" },
  { label: "High Sugar", note: "Frequent sweet foods or drinks" },
  { label: "High Fat", note: "Richer meals most days" },
];

const HORMONAL = [
  { label: "Stable", note: "No major changes lately" },
  { label: "Fluctuating", note: "Changes around cycles or stress" },
  { label: "Teen", note: "Teenage hormonal changes" },
  { label: "Pregnant", note: "Pregnancy-related changes" },
  { label: "PCOS", note: "PCOS-related concerns" },
];

const BUDGETS = [
  { label: "Low", note: "Under $30/month" },
  { label: "Medium", note: "$30-$80/month" },
  { label: "High", note: "$80+/month" },
];

const SEVERITY_FIELDS = [
  { key: "Acne_Severity", label: "Acne" },
  { key: "Dryness_Severity", label: "Dryness" },
  { key: "Pigmentation_Severity", label: "Dark spots" },
  { key: "Aging_Severity", label: "Fine lines" },
  { key: "Sensitivity_Severity", label: "Sensitivity" },
];

const questions = [
  {
    key: "Age",
    eyebrow: "Profile",
    title: "What age range are you in?",
    subtitle: "Age helps us tune hydration, texture, and care priorities.",
    options: AGE_OPTIONS,
    columns: "grid-cols-2",
  },
  {
    key: "Skin_Type",
    eyebrow: "Skin type",
    title: "How does your skin usually feel?",
    subtitle: "Choose the closest match for most days.",
    options: SKIN_TYPES,
  },
  {
    key: "Skin_Tone",
    eyebrow: "Skin tone",
    title: "Which skin tone is closest?",
    subtitle: "This helps personalize tone and pigmentation support.",
    tonePicker: true,
    options: SKIN_TONES,
  },
  {
    key: "Climate",
    eyebrow: "Environment",
    title: "What climate do you live in?",
    subtitle: "Your environment can change how much support your skin needs.",
    options: CLIMATES,
  },
  {
    key: "Diet",
    eyebrow: "Lifestyle",
    title: "How would you describe your diet?",
    subtitle: "Lifestyle context helps build a more realistic routine.",
    options: DIETS,
  },
  {
    key: "Hormonal_Status",
    eyebrow: "Balance",
    title: "What best describes your hormonal status?",
    subtitle: "Pick the option that feels most relevant right now.",
    options: HORMONAL,
  },
  {
    key: "Budget_Level",
    eyebrow: "Routine style",
    title: "What skincare budget feels right?",
    subtitle: "We will keep product recommendations aligned with your comfort zone.",
    options: BUDGETS,
  },
  {
    eyebrow: "Concerns",
    title: "Rate your top skin concerns.",
    subtitle: "0 means none. 5 means it is a major concern.",
    severity: true,
  },
];

export default function Quiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isRetake = new URLSearchParams(location.search).get("retake") === "1";
  const [step, setStep] = useState(0);
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

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const isFinalStep = step === questions.length - 1;

  useEffect(() => {
    if (isRetake) {
      dispatch(resetRoutine());
      return;
    }

    const loadExistingRoutine = async () => {
      try {
        const res = await api.get("/routines/active");
        if (res.data) {
          navigate("/routine", { replace: true });
        }
      } catch {
        /* No saved routine yet, so the quiz should be shown. */
      }
    };

    loadExistingRoutine();
  }, [dispatch, isRetake, navigate]);

  const goNext = () => {
    setStep((currentStep) => Math.min(currentStep + 1, questions.length - 1));
  };

  const goBack = () => {
    setStep((currentStep) => Math.max(currentStep - 1, 0));
  };

  const pick = (key, value) => {
    setAnswers((currentAnswers) => ({ ...currentAnswers, [key]: value }));

    if (!isFinalStep) {
      setTimeout(goNext, 220);
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
      if (res.data.routineId) {
        dispatch(setSavedRoutineId(res.data.routineId));
      }
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

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ec] text-[#151712]">
      <section className="relative flex min-h-[calc(100vh-86px)] items-center px-4 py-10 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(132,77,99,0.16),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(184,146,95,0.18),transparent_28%),linear-gradient(135deg,#fbf8f4_0%,#f7f3ec_52%,#efe7df_100%)]" />
        <div className="absolute left-8 top-16 h-48 w-48 rounded-full bg-white/35 blur-3xl" />
        <div className="absolute bottom-8 right-10 h-64 w-64 rounded-full bg-[#ead5dd]/45 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.72fr_1fr]">
          <aside className="rounded-[2.5rem] border border-white/70 bg-white/35 p-6 shadow-xl shadow-black/5 backdrop-blur-2xl md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#844D63]">
              AuraSkin assessment
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Let's build your skin profile.
            </h1>
            <p className="mt-5 text-base leading-7 text-[#62665d]">
              Answer each card calmly. Your responses shape a personalized
              routine with products matched to your goals, skin type, and
              budget.
            </p>

            <div className="mt-8 rounded-[2rem] border border-white/70 bg-white/45 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between text-sm font-medium text-[#6d6c63]">
                <span>
                  Step {step + 1} of {questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/80">
                <div
                  className="h-full rounded-full bg-[#844D63] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-2">
              {questions.map((question, index) => (
                <button
                  key={question.eyebrow}
                  type="button"
                  onClick={() => setStep(index)}
                  className={`h-2 rounded-full transition ${
                    index <= step ? "bg-[#844D63]" : "bg-white/70"
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </aside>

          <div className="rounded-[2.75rem] border border-white/70 bg-white/55 p-5 shadow-2xl shadow-[#8b7a6d]/15 backdrop-blur-2xl md:p-8">
            <div className="min-h-[560px] rounded-[2.25rem] border border-white/80 bg-[#fbf8f4]/70 p-5 md:p-8">
              <div key={step} className="animate-[fadeIn_0.35s_ease-out]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#844D63]">
                  {currentQuestion.eyebrow}
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
                  {currentQuestion.title}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-[#62665d]">
                  {currentQuestion.subtitle}
                </p>

                {currentQuestion.tonePicker ? (
                  <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => pick(currentQuestion.key, option.label)}
                        className={`rounded-[2rem] border p-5 text-left shadow-sm transition hover:-translate-y-0.5 ${
                          answers[currentQuestion.key] === option.label
                            ? "border-[#844D63] bg-white text-[#151712] ring-4 ring-[#ead5dd]"
                            : "border-white/80 bg-white/55 text-[#4d5047] hover:bg-white"
                        }`}
                      >
                        <span
                          className={`block h-20 w-20 rounded-full ${option.color} shadow-inner`}
                        />
                        <span className="mt-5 block text-lg font-semibold">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : currentQuestion.severity ? (
                  <div className="mt-8 space-y-5">
                    {SEVERITY_FIELDS.map(({ key, label }) => (
                      <div
                        key={key}
                        className="rounded-[1.5rem] border border-white/80 bg-white/65 p-4 shadow-sm"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <span className="font-semibold text-[#2c3427]">
                            {label}
                          </span>
                          <span className="rounded-full bg-[#ead5dd] px-3 py-1 text-sm font-bold text-[#844D63]">
                            {answers[key]}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={5}
                          step={1}
                          value={answers[key]}
                          onChange={(event) =>
                            setAnswers((currentAnswers) => ({
                              ...currentAnswers,
                              [key]: parseInt(event.target.value, 10),
                            }))
                          }
                          className="w-full accent-[#844D63]"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className={`mt-8 grid gap-3 ${
                      currentQuestion.columns || "grid-cols-1"
                    }`}
                  >
                    {currentQuestion.options.map((option) => (
                      <OptionCard
                        key={option.label}
                        selected={answers[currentQuestion.key] === option.value || answers[currentQuestion.key] === option.label}
                        onClick={() =>
                          pick(
                            currentQuestion.key,
                            option.value ?? option.label,
                          )
                        }
                      >
                        <span className="text-base font-semibold">
                          {option.label}
                        </span>
                        {option.note && (
                          <span className="mt-1 block text-sm font-normal opacity-70">
                            {option.note}
                          </span>
                        )}
                      </OptionCard>
                    ))}
                  </div>
                )}

                {error && (
                  <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 0}
                  className="rounded-full border border-white/80 bg-white/65 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#844D63] shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Back
                </button>

                {isFinalStep ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="rounded-full bg-[#151712]/90 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#303326] disabled:opacity-50"
                  >
                    {submitting ? "Building routine..." : "Reveal my routine"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-full bg-[#151712]/90 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#303326]"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}

function OptionCard({ children, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[1.5rem] border px-5 py-4 text-left shadow-sm transition hover:-translate-y-0.5 ${
        selected
          ? "border-[#844D63] bg-white text-[#151712] ring-4 ring-[#ead5dd]"
          : "border-white/80 bg-white/60 text-[#4d5047] hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}
