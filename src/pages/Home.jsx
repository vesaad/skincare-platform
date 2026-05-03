import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-8 py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <span>✨</span>
          <span>AI-Powered Skincare Platform</span>
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Advanced Skin
          <span className="block bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
            Intelligence System
          </span>
        </h1>

        <p className="text-xl text-gray-500 mb-10 max-w-2xl">
          Zbulo rutinën perfekte të kujdesit për lëkurën tënde me ndihmën e
          inteligjencës artificiale. Personalizuar vetëm për ty.
        </p>

        <div className="flex gap-4">
          <Link
            to="/register"
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-purple-200"
          >
            Fillo tani — Falas
          </Link>
          <Link
            to="/products"
            className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold hover:shadow-md transition border border-gray-200"
          >
            Shiko produktet →
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-8 mb-20">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 grid grid-cols-3 gap-8">
          {[
            { number: "10,000+", label: "Produkte të analizuara" },
            { number: "98%", label: "Saktësi e AI" },
            { number: "5,000+", label: "Përdorues aktivë" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
                {stat.number}
              </p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-8 mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Çfarë ofron platforma?
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              icon: "🧴",
              title: "Product Explorer",
              desc: "Kërko dhe filtro mbi 10,000 produkte të analizuara nga AI sipas llojit të lëkurës tënde.",
              link: "/products",
              cta: "Eksploro produktet",
            },
            {
              icon: "🧪",
              title: "Skincare Quiz",
              desc: "Plotëso quizin dhe merr rutinën tënde personale në kohë reale me teknologji Socket.IO.",
              link: "/quiz",
              cta: "Fillo quizin",
            },
            {
              icon: "📊",
              title: "Dashboard Personal",
              desc: "Shiko progresin tënd, rutinën aktive dhe rekomandimet e personalizuara në një vend.",
              link: "/dashboard",
              cta: "Shiko dashboard",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition group"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4">{f.desc}</p>
              <Link
                to={f.link}
                className="text-purple-500 text-sm font-medium hover:text-purple-700"
              >
                {f.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="max-w-4xl mx-auto px-8 pb-20">
        <div className="bg-gradient-to-r from-purple-500 to-pink-400 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Gati të fillosh?</h2>
          <p className="text-purple-100 mb-8">
            Regjistrohu falas dhe zbulo rutinën tënde të personalizuar sot.
          </p>
          <Link
            to="/register"
            className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition"
          >
            Regjistrohu tani
          </Link>
        </div>
      </div>
    </div>
  );
}
