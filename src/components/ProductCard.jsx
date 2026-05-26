const colors = [
  "from-purple-100 to-pink-100",
  "from-blue-100 to-cyan-100",
  "from-green-100 to-emerald-100",
  "from-yellow-100 to-orange-100",
  "from-pink-100 to-rose-100",
];

export default function ProductCard({ product }) {
  const categoryLabel =
    typeof product.category === "string"
      ? product.category
      : product.category?.name ?? "";
  const placeholderLetter = (
    categoryLabel[0] ||
    product.name?.[0] ||
    "?"
  ).toUpperCase();
  const color = colors[product.id % colors.length] || colors[0];
  const match = product.matchScore
    ? Math.round(product.matchScore * 100)
    : Math.floor(70 + (product.id % 29));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition group overflow-hidden">
      <div className="relative h-36 overflow-hidden bg-gray-50">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-3"
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentNode.innerHTML = `
                <div class="bg-gradient-to-br ${color} h-36 flex items-center justify-center">
                  <div class="w-16 h-16 rounded-2xl bg-white/80 shadow-sm flex items-center justify-center text-2xl font-bold text-purple-600">${placeholderLetter}</div>
                </div>`;
            }}
          />
        ) : (
          <div
            className={`bg-gradient-to-br ${color} h-36 flex items-center justify-center`}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/80 shadow-sm flex items-center justify-center text-2xl font-bold text-purple-600">
              {placeholderLetter}
            </div>
          </div>
        )}
        <span className="absolute top-2 right-2 bg-white text-purple-600 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
          {match}% match
        </span>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
          {typeof product.brand === "string"
            ? product.brand
            : product.brand?.name || "Brand"}
        </p>
        <h3 className="font-semibold text-gray-900 text-sm mb-2 leading-tight">
          {product.name}
        </h3>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.productIngredients?.slice(0, 2).map((pi) => (
            <span
              key={pi.id}
              className="bg-purple-50 text-purple-600 text-xs px-2 py-0.5 rounded-full"
            >
              {pi.ingredient?.name}
            </span>
          ))}
          {categoryLabel && (
            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
              {categoryLabel}
            </span>
          )}
        </div>

        <p className="font-bold text-gray-900">${product.price}</p>
      </div>
    </div>
  );
}
