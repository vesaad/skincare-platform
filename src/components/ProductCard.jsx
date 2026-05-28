const colors = [
  "from-purple-100 to-pink-100",
  "from-blue-100 to-cyan-100",
  "from-green-100 to-emerald-100",
  "from-yellow-100 to-orange-100",
  "from-pink-100 to-rose-100",
];

const categoryStyles = {
  Cleanser: {
    badge: "bg-sky-50 text-sky-600",
    ring: "group-hover:border-sky-200",
    image: "bg-sky-50",
  },
  Moisturizer: {
    badge: "bg-pink-50 text-pink-600",
    ring: "group-hover:border-pink-200",
    image: "bg-pink-50",
  },
  Serum: {
    badge: "bg-purple-50 text-purple-600",
    ring: "group-hover:border-purple-200",
    image: "bg-purple-50",
  },
  Sunscreen: {
    badge: "bg-amber-50 text-amber-600",
    ring: "group-hover:border-amber-200",
    image: "bg-amber-50",
  },
  Toner: {
    badge: "bg-emerald-50 text-emerald-600",
    ring: "group-hover:border-emerald-200",
    image: "bg-emerald-50",
  },
};

const benefitLabels = {
  "Hyaluronic Acid": "Hydrating",
  Ceramides: "Barrier support",
  Retinol: "Texture care",
  "Vitamin C": "Brightening",
  "Salicylic Acid": "Oil control",
};

export default function ProductCard({ product, onSelect }) {
  const categoryLabel =
    typeof product.category === "string"
      ? product.category
      : product.category?.name ?? "";
  const brandLabel =
    typeof product.brand === "string"
      ? product.brand
      : product.brand?.name || "Brand";
  const placeholderLetter = (
    categoryLabel[0] ||
    product.name?.[0] ||
    "?"
  ).toUpperCase();
  const color = colors[product.id % colors.length] || colors[0];
  const match = product.matchScore
    ? Math.round(product.matchScore * 100)
    : Math.floor(70 + (product.id % 29));
  const categoryStyle = categoryStyles[categoryLabel] || {
    badge: "bg-gray-100 text-gray-500",
    ring: "group-hover:border-purple-200",
    image: "bg-gray-50",
  };
  const ingredientList = product.ingredients
    ? product.ingredients.split("|").map((item) => item.trim()).filter(Boolean)
    : [];
  const benefit = ingredientList.map((item) => benefitLabels[item]).find(Boolean);

  return (
    <button
      type="button"
      onClick={() => onSelect?.(product)}
      className={`group h-full w-full overflow-hidden rounded-2xl border border-gray-100 bg-white text-left transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300 ${categoryStyle.ring}`}
    >
      <div className={`relative h-36 overflow-hidden ${categoryStyle.image}`}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-contain p-3 transition duration-300 group-hover:scale-105"
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
        <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-purple-600 opacity-0 shadow-sm transition group-hover:opacity-100">
          View details
        </span>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
          {brandLabel}
        </p>
        <h3 className="font-semibold text-gray-900 text-sm mb-2 leading-tight">
          {product.name}
        </h3>
        {benefit && (
          <p className="mb-3 text-xs font-medium text-pink-500">{benefit}</p>
        )}

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
            <span
              className={`${categoryStyle.badge} text-xs px-2 py-0.5 rounded-full`}
            >
              {categoryLabel}
            </span>
          )}
        </div>

        <p className="font-bold text-gray-900">${product.price}</p>
      </div>
    </button>
  );
}
