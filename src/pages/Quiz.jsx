import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import api from "../services/api";

const socket = io("http://localhost:3001");

export default function Quiz() {
  const [inputs, setInputs] = useState({
    skinType: "Yndyrore",
    hydration: 5,
    oilLevel: 5,
    sensitivity: 5,
    sleepHours: 7,
    waterIntake: 5,
    climate: "Temperate",
  });
  const [routine, setRoutine] = useState(null);

  useEffect(() => {
    socket.on("routine:updated", (data) => setRoutine(data));
    return () => socket.off("routine:updated");
  }, []);

  const handleChange = (key, value) => {
    const updated = { ...inputs, [key]: value };
    setInputs(updated);
    socket.emit("quiz:update", updated);
  };

  const handleSave = async () => {
    try {
      await api.post("/assessment", inputs);
      alert("Rutina u ruajt me sukses!");
    } catch {
      alert("Duhet të jesh i loguar për të ruajtur!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto px-8 py-10 flex gap-8">
        {/* Left - Quiz Form */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quiz i Lëkurës
          </h1>
          <p className="text-gray-400 mb-8">
            Plotëso pyetjet dhe merr rutinën tënde personale — rezultati
            ndryshon live ndërsa plotëson.
          </p>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h2 className="font-semibold text-gray-900 mb-4">
              Lloji i lëkurës & gjendja bazike
            </h2>
            <label className="block text-sm text-gray-500 mb-2">
              Cili është lloji i lëkurës sate?
            </label>
            <select
              value={inputs.skinType}
              onChange={(e) => handleChange("skinType", e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              {["Yndyrore", "E thatë", "Mikse", "Normale", "E ndjeshme"].map(
                (t) => (
                  <option key={t}>{t}</option>
                ),
              )}
            </select>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h2 className="font-semibold text-gray-900 mb-4">Nivelet</h2>
            {[
              {
                key: "hydration",
                label: "Niveli i hidratimit",
                min: 1,
                max: 10,
                left: "Shumë e thatë",
                right: "Shumë e lyer",
              },
              {
                key: "oilLevel",
                label: "Niveli i yndyrës",
                min: 1,
                max: 10,
                left: "Aspak",
                right: "Shumë",
              },
              {
                key: "sensitivity",
                label: "Ndjeshmëria",
                min: 1,
                max: 10,
                left: "Aspak e ndjeshme",
                right: "Shumë e ndjeshme",
              },
            ].map((s) => (
              <div key={s.key} className="mb-5">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm text-gray-600">{s.label}</label>
                  <span className="text-sm font-bold text-purple-600">
                    {inputs[s.key]}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={inputs[s.key]}
                  onChange={(e) =>
                    handleChange(s.key, parseInt(e.target.value))
                  }
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{s.left}</span>
                  <span>{s.right}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
            <h2 className="font-semibold text-gray-900 mb-4">
              Faktorë jetësorë
            </h2>
            {[
              {
                key: "sleepHours",
                label: "Orë gjumi në natë",
                min: 3,
                max: 10,
                left: "3 orë",
                right: "10 orë",
              },
              {
                key: "waterIntake",
                label: "Ujë të pini në ditë (gota)",
                min: 1,
                max: 12,
                left: "1 gotë",
                right: "12 gota",
              },
            ].map((s) => (
              <div key={s.key} className="mb-5">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm text-gray-600">{s.label}</label>
                  <span className="text-sm font-bold text-purple-600">
                    {inputs[s.key]}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={inputs[s.key]}
                  onChange={(e) =>
                    handleChange(s.key, parseFloat(e.target.value))
                  }
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{s.left}</span>
                  <span>{s.right}</span>
                </div>
              </div>
            ))}
            <label className="block text-sm text-gray-600 mb-2">
              Klima ku jeton
            </label>
            <select
              value={inputs.climate}
              onChange={(e) => handleChange("climate", e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              {[
                "Temperate",
                "E butë (Mesdhetare)",
                "E ftohtë",
                "E nxehtë dhe e lagësht",
                "E thatë",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right - Live Preview */}
        <div className="w-80 flex-shrink-0">
          <div className="sticky top-24">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Live preview</span>
              </div>
              <h2 className="font-bold text-gray-900 mb-1">
                Rutina jote personale
              </h2>
              <p className="text-xs text-gray-400 mb-4">
                Ndryshon automatikisht ndërsa plotëson quizin
              </p>

              {routine ? (
                <div>
                  <div className="bg-purple-50 rounded-xl p-3 mb-4 text-center">
                    <p className="text-xs text-purple-400 mb-1">
                      Tipi i lëkurës tënde
                    </p>
                    <p className="font-bold text-purple-700">
                      {inputs.skinType}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center bg-gray-50 rounded-xl p-2">
                      <p className="text-lg font-bold text-purple-600">
                        {(routine.confidence * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-gray-400">Saktësia</p>
                    </div>
                    <div className="text-center bg-gray-50 rounded-xl p-2">
                      <p className="text-lg font-bold text-blue-500">4</p>
                      <p className="text-xs text-gray-400">Produkte</p>
                    </div>
                    <div className="text-center bg-gray-50 rounded-xl p-2">
                      <p className="text-lg font-bold text-green-500">2</p>
                      <p className="text-xs text-gray-400">Hapat</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-500 mb-2">
                      🌅 Mëngjesi
                    </p>
                    {[
                      "Foaming Cleanser",
                      "Niacinamide 10%",
                      "Hydro Boost Gel",
                      "SPF 50+ UV Mune",
                    ].map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 py-1.5 border-b border-gray-50"
                      >
                        <span className="text-sm">🧴</span>
                        <span className="text-xs text-gray-700">{p}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleSave}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-400 text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition"
                  >
                    Ruaj rutinën time →
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-300">
                  <p className="text-4xl mb-2">🧴</p>
                  <p className="text-sm">
                    Lëviz sliderët për të parë rutinën live
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
