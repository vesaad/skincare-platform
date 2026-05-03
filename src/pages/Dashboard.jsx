import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { user } = useSelector((s) => s.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Mirësevjen, {user?.firstName || "Përdorues"} 👋
          </h1>
          <p className="text-gray-400 mt-1">
            Kjo është pasqyra e profilit tënd të kujdesit
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Saktësia ML",
              value: "87%",
              icon: "🤖",
              color: "from-purple-500 to-pink-400",
            },
            {
              label: "Produkte",
              value: "7",
              icon: "🧴",
              color: "from-blue-400 to-cyan-400",
            },
            {
              label: "Ditë aktive",
              value: "12",
              icon: "📅",
              color: "from-green-400 to-emerald-400",
            },
            {
              label: "Progres",
              value: "73%",
              icon: "📊",
              color: "from-orange-400 to-yellow-400",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div
                className={`w-10 h-10 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center text-xl mb-3`}
              >
                {s.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Rutina aktive */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900">Rutina aktive</h2>
              <Link
                to="/routine"
                className="text-purple-500 text-sm hover:text-purple-700"
              >
                Shiko të gjitha →
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {[
                {
                  time: "🌅 Mëngjesi",
                  steps: "Cleanser → Serum → Moisturizer → SPF",
                  match: 91,
                },
                {
                  time: "🌙 Mbrëmja",
                  steps: "Cleanser → Exfoliant → Moisturizer",
                  match: 89,
                },
              ].map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-purple-50 rounded-xl"
                >
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {r.time}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{r.steps}</p>
                  </div>
                  <span className="bg-white text-purple-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {r.match}% match
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Veprime të shpejta</h2>
            <div className="flex flex-col gap-3">
              {[
                {
                  label: "Bëj quizin",
                  desc: "Përditëso rutinën",
                  link: "/quiz",
                  icon: "🧪",
                },
                {
                  label: "Eksploro produkte",
                  desc: "Zbulo të reja",
                  link: "/products",
                  icon: "🧴",
                },
                {
                  label: "Shiko rutinën",
                  desc: "Morning & Night",
                  link: "/routine",
                  icon: "📋",
                },
              ].map((a, i) => (
                <Link
                  key={i}
                  to={a.link}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition group"
                >
                  <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center text-lg">
                    {a.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {a.label}
                    </p>
                    <p className="text-xs text-gray-400">{a.desc}</p>
                  </div>
                  <span className="ml-auto text-gray-300 group-hover:text-purple-400">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Skin Profile */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Profili i lëkurës</h2>
            <div className="flex flex-col gap-3">
              {[
                { label: "Lloji", value: "Yndyrore" },
                { label: "Hidratimi", value: "4/10" },
                { label: "Ndjeshmëria", value: "5/10" },
                { label: "Klima", value: "Temperate" },
              ].map((p, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{p.label}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {p.value}
                  </span>
                </div>
              ))}
            </div>
            <Link
              to="/quiz"
              className="mt-4 block text-center text-xs text-purple-500 hover:text-purple-700"
            >
              Përditëso profilin →
            </Link>
          </div>

          {/* Progress Log */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Progresi i fundit</h2>
            <div className="flex flex-col gap-2">
              {[
                { date: "Sot", rating: 5, note: "Lëkura duket shumë mirë!" },
                { date: "Dje", rating: 4, note: "Pak e thatë në mëngjes" },
                { date: "2 ditë më parë", rating: 4, note: "Normal" },
              ].map((log, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-xl bg-gray-50"
                >
                  <span className="text-xs text-gray-400 w-24">{log.date}</span>
                  <span className="text-yellow-400">
                    {"⭐".repeat(log.rating)}
                  </span>
                  <span className="text-sm text-gray-600">{log.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
