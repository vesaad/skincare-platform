import { Link } from "react-router-dom";

const morningSteps = [
  {
    step: 1,
    type: "Cleanser",
    product: "Gentle Foaming Cleanser",
    brand: "CeraVe",
    match: 98,
    emoji: "🧴",
  },
  {
    step: 2,
    type: "Serum",
    product: "Niacinamide 10% + Zinc 1%",
    brand: "The Ordinary",
    match: 95,
    emoji: "💧",
  },
  {
    step: 3,
    type: "Moisturizer",
    product: "Hydro Boost Water Gel",
    brand: "Neutrogena",
    match: 91,
    emoji: "🌿",
  },
  {
    step: 4,
    type: "Sunscreen",
    product: "Anthelios UV Mune SPF 50+",
    brand: "La Roche-Posay",
    match: 88,
    emoji: "☀️",
  },
];

const nightSteps = [
  {
    step: 1,
    type: "Cleanser",
    product: "Gentle Cleanser",
    brand: "CeraVe",
    match: 96,
    emoji: "🧴",
  },
  {
    step: 2,
    type: "Serum",
    product: "BHA 2% Liquid Exfoliant",
    brand: "Paula's Choice",
    match: 89,
    emoji: "✨",
  },
  {
    step: 3,
    type: "Moisturizer",
    product: "Moisturizing Cream",
    brand: "CeraVe",
    match: 92,
    emoji: "💜",
  },
];

function RoutineStep({ step, type, product, brand, match, emoji }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition">
      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
        {step}
      </div>
      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
        {emoji}
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-400 uppercase tracking-wider">{type}</p>
        <p className="font-semibold text-gray-900 text-sm">{product}</p>
        <p className="text-xs text-gray-400">{brand}</p>
      </div>
      <span className="bg-purple-50 text-purple-600 text-xs font-bold px-2 py-1 rounded-full">
        {match}% match
      </span>
    </div>
  );
}

export default function Routine() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Rutina jote personale
          </h1>
          <p className="text-gray-400 mt-1">
            Bazuar në profilin tënd të lëkurës — përditësohet automatikisht
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Saktësia e ML", value: "87%", color: "text-purple-600" },
            { label: "Produkte", value: "7", color: "text-pink-500" },
            { label: "Hapat", value: "4", color: "text-blue-500" },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 border border-gray-100 text-center"
            >
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Morning Routine */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌅</span>
              <div>
                <h2 className="font-bold text-gray-900">Mëngjesi</h2>
                <p className="text-xs text-gray-400">4 hapa — ~5 minuta</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {morningSteps.map((s) => (
                <RoutineStep key={s.step} {...s} />
              ))}
            </div>
          </div>

          {/* Night Routine */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌙</span>
              <div>
                <h2 className="font-bold text-gray-900">Mbrëmja</h2>
                <p className="text-xs text-gray-400">3 hapa — ~5 minuta</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {nightSteps.map((s) => (
                <RoutineStep key={s.step} {...s} />
              ))}
            </div>
          </div>
        </div>

        {/* Progress Log */}
        <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">
            📊 Regjistro progresin sot
          </h2>
          <div className="flex gap-4 items-center flex-wrap">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className="w-10 h-10 rounded-xl border border-gray-200 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 transition text-sm font-medium"
                >
                  {n}⭐
                </button>
              ))}
            </div>
            <input
              placeholder="Shënim (opsional)..."
              className="flex-1 border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button className="bg-gradient-to-r from-purple-500 to-pink-400 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
              Ruaj
            </button>
          </div>
        </div>

        {/* Link tek Quiz */}
        <div className="mt-4 text-center">
          <Link
            to="/quiz"
            className="text-purple-500 text-sm hover:text-purple-700"
          >
            ↺ Ndrysho rutinën duke bërë quizin sërish
          </Link>
        </div>
      </div>
    </div>
  );
}
