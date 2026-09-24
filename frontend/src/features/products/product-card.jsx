const colors = [
  "from-[#ead5dd] to-[#f7efe2]",
  "from-[#dfe9e5] to-[#f7f3ec]",
  "from-[#efe0cb] to-[#fbf8f4]",
  "from-[#e8dce8] to-[#f7f3ec]",
  "from-[#f1ded8] to-[#fbf8f4]",
];

const categoryStyles = {
  Cleanser: {
    badge: "bg-[#e4f1f3] text-[#3d7880]",
    ring: "group-hover:border-[#b9dadd]",
    image: "bg-[#f2f8f8]",
  },
  Moisturizer: {
    badge: "bg-[#ead5dd] text-[#844D63]",
    ring: "group-hover:border-[#d9b9c6]",
    image: "bg-[#fbf3f6]",
  },
  Serum: {
    badge: "bg-[#e8dce8] text-[#775171]",
    ring: "group-hover:border-[#d5bfd5]",
    image: "bg-[#f7f1f7]",
  },
  Sunscreen: {
    badge: "bg-[#efe0cb] text-[#9a6a35]",
    ring: "group-hover:border-[#dcc49f]",
    image: "bg-[#fbf6ed]",
  },
  Toner: {
    badge: "bg-[#dfe9e5] text-[#557368]",
    ring: "group-hover:border-[#c3d8d0]",
    image: "bg-[#f2f8f5]",
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
    badge: "bg-white/80 text-[#62665d]",
    ring: "group-hover:border-[#eadfd9]",
    image: "bg-[#fbf8f4]",
  };
  const ingredientList = product.ingredients
    ? product.ingredients.split("|").map((item) => item.trim()).filter(Boolean)
    : [];
  const benefit = ingredientList.map((item) => benefitLabels[item]).find(Boolean);

  return (
    <button
      type="button"
      onClick={() => onSelect?.(product)}
      className={`group h-full w-full overflow-hidden rounded-[1.75rem] border border-white/75 bg-white/65 text-left shadow-sm shadow-black/5 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/80 hover:shadow-xl hover:shadow-[#8b7a6d]/10 focus:outline-none focus:ring-4 focus:ring-[#ead5dd]/70 ${categoryStyle.ring}`}
    >
      <div className={`relative h-48 overflow-hidden ${categoryStyle.image}`}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full bg-transparent object-contain p-5 mix-blend-multiply transition duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentNode.innerHTML = `
                <div class="bg-gradient-to-br ${color} h-48 flex items-center justify-center">
                  <div class="w-16 h-16 rounded-2xl bg-white/80 shadow-sm flex items-center justify-center text-2xl font-bold text-[#844D63]">${placeholderLetter}</div>
                </div>`;
            }}
          />
        ) : (
          <div
            className={`bg-gradient-to-br ${color} h-48 flex items-center justify-center`}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/80 shadow-sm flex items-center justify-center text-2xl font-bold text-[#844D63]">
              {placeholderLetter}
            </div>
          </div>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#844D63] shadow-sm backdrop-blur">
          {match}% match
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-[#151712]/90 px-3 py-1 text-xs font-semibold text-white opacity-0 shadow-sm transition group-hover:opacity-100">
          View details
        </span>
      </div>

      <div className="p-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#9b948a]">
          {brandLabel}
        </p>
        <h3 className="mb-2 min-h-10 text-base font-semibold leading-tight text-[#151712]">
          {product.name}
        </h3>
        {benefit && (
          <p className="mb-3 text-xs font-semibold text-[#844D63]">{benefit}</p>
        )}

        <div className="flex flex-wrap gap-1 mb-3">
          {product.productIngredients?.slice(0, 2).map((pi) => (
            <span
              key={pi.id}
              className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-[#62665d] ring-1 ring-[#eadfd9]"
            >
              {pi.ingredient?.name}
            </span>
          ))}
          {categoryLabel && (
            <span
              className={`${categoryStyle.badge} rounded-full px-2.5 py-1 text-xs font-semibold`}
            >
              {categoryLabel}
            </span>
          )}
        </div>

        <p className="text-lg font-bold text-[#151712]">${product.price}</p>
      </div>
    </button>
  );
}
