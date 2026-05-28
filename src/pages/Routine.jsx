import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import api from "../services/api";
import { setSavedRoutineId } from "../store/slices/routineSlice";

function ProductStepCard({ product }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <img
          src={`/images/products/${product.product_id}.jpg`}
          alt={product.name}
          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
            {product.step}
          </p>
          <h3 className="font-semibold text-gray-900 mt-1">{product.name}</h3>
          <p className="text-sm text-gray-400">{product.brand}</p>
          <p className="text-lg font-bold text-gray-900 mt-2">${product.price}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {(product.ingredients || []).map((ing) => (
              <span
                key={ing}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Routine() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, savedRoutineId } = useSelector((s) => s.routine);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-gray-500 mb-6">
            No routine yet. Complete the quiz to get your personalized plan.
          </p>
          <Link
            to="/quiz"
            className="inline-block px-6 py-3 bg-gray-900 text-white rounded-2xl font-medium"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await api.post("/routines", {
        routineType: data.routine,
        products: data.products,
      });
      dispatch(setSavedRoutineId(res.data.id));
      setSaved(true);
    } catch (err) {
      setError(err.response?.data?.error || "Could not save routine");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">
          Your personalized plan
        </p>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          {data.routine.replace(" Routine", "")} Routine
        </h1>
        <p className="text-gray-400 mt-2">
          Model confidence:{" "}
          <span className="font-semibold text-gray-700">{data.confidence}%</span>
        </p>

        <div className="mt-10 flex flex-col gap-4">
          {data.products?.map((p) => (
            <ProductStepCard key={`${p.step}-${p.product_id}`} product={p} />
          ))}
        </div>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || saved}
            className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 disabled:opacity-50 transition"
          >
            {saved ? "✓ Routine Saved" : saving ? "Saving…" : "Save Routine"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/quiz")}
            className="flex-1 py-4 border border-gray-200 bg-white text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition"
          >
            Back to Quiz
          </button>
        </div>

        {saved && (
          <p className="text-center text-sm text-gray-400 mt-4">
            <Link to="/dashboard" className="text-purple-600 hover:underline">
              View on Dashboard →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}