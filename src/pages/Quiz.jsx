import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Quiz() {
  const [inputs, setInputs] = useState({
    skinType: "Dry",
    hydration: 5,
    oilLevel: 5,
    sensitivity: 5,
    sleepHours: 7,
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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Skincare Quiz</h1>
      <div className="bg-white rounded-xl p-6 shadow mb-6">
        <label className="block mb-2">Hydration: {inputs.hydration}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={inputs.hydration}
          onChange={(e) => handleChange("hydration", parseInt(e.target.value))}
          className="w-full mb-4"
        />
        <label className="block mb-2">Sleep Hours: {inputs.sleepHours}</label>
        <input
          type="range"
          min="4"
          max="10"
          value={inputs.sleepHours}
          onChange={(e) =>
            handleChange("sleepHours", parseFloat(e.target.value))
          }
          className="w-full mb-4"
        />
        <label className="block mb-2">Skin Type:</label>
        <select
          value={inputs.skinType}
          onChange={(e) => handleChange("skinType", e.target.value)}
          className="border p-2 rounded w-full"
        >
          {["Dry", "Oily", "Combination", "Normal", "Sensitive"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      {routine && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h2 className="font-bold text-green-800 mb-2">Rutina jote:</h2>
          <p className="text-green-700">{routine.routineType}</p>
          <p className="text-sm text-green-600">
            Besueshmëria: {(routine.confidence * 100).toFixed(0)}%
          </p>
        </div>
      )}
    </div>
  );
}
