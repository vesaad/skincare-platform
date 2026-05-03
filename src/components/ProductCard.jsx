const emojis = ["🧴", "💧", "🌿", "✨", "🌸", "💜", "🍊", "💎"];
const colors = [
  "from-purple-100 to-pink-100",
  "from-blue-100 to-cyan-100",
  "from-green-100 to-emerald-100",
  "from-yellow-100 to-orange-100",
  "from-pink-100 to-rose-100",
];

export default function ProductCard({ product }) {
  const emoji = emojis[product.id % emojis.length] || "🧴";
  const color = colors[product.id % colors.length] || colors[0];
  const match = product.matchScore
    ? Math.round(product.matchScore * 100)
    : Math.floor(70 + (product.id % 29));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition group overflow-hidden">
      {/* Image Area */}
      <div
        className={`relative bg-gradient-to-br ${color} h-36 flex items-center justify-center`}
      >
        <span className="text-5xl">{emoji}</span>
        <span className="absolute top-2 right-2 bg-white text-purple-600 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
          {match}% match
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
          {product.brand?.name || "Brand"}
        </p>
        <h3 className="font-semibold text-gray-900 text-sm mb-2 leading-tight">
          {product.name}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.productIngredients?.slice(0, 2).map((pi) => (
            <span
              key={pi.id}
              className="bg-purple-50 text-purple-600 text-xs px-2 py-0.5 rounded-full"
            >
              {pi.ingredient?.name}
            </span>
          ))}
          {product.category?.name && (
            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
              {product.category.name}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-900">${product.price}</p>
          <button className="text-xs bg-purple-500 text-white px-3 py-1.5 rounded-lg hover:bg-purple-600 transition">
            + Shto
          </button>
        </div>
      </div>
    </div>
  );
}
