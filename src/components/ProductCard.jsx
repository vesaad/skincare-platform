import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

const emojis = ["🧴", "💧", "🌿", "✨", "🌸", "💜", "🍊", "💎"];
const colors = [
  "from-purple-100 to-pink-100",
  "from-blue-100 to-cyan-100",
  "from-green-100 to-emerald-100",
  "from-yellow-100 to-orange-100",
  "from-pink-100 to-rose-100",
];

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.items);
  const inCart = cartItems.some((i) => i.id === product.id);

  const emoji = emojis[product.id % emojis.length] || "🧴";
  const color = colors[product.id % colors.length] || colors[0];
  const match = product.matchScore
    ? Math.round(product.matchScore * 100)
    : Math.floor(70 + (product.id % 29));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition group overflow-hidden">
      <div
        className={`relative bg-gradient-to-br ${color} h-36 flex items-center justify-center`}
      >
        {product.imageUrl ? (
          <img
            src={`http://localhost:3001/images/${product.imageUrl}`}
            alt={product.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <span className="text-5xl">{emoji}</span>
        )}
        <span className="absolute top-2 right-2 bg-white text-purple-600 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
          {match}% match
        </span>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
          {product.brand?.name || "Brand"}
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
          {product.category?.name && (
            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
              {product.category.name}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-900">${product.price}</p>
          <button
            onClick={() => dispatch(addToCart(product))}
            className={`text-xs px-3 py-1.5 rounded-lg transition ${
              inCart
                ? "bg-green-500 text-white"
                : "bg-purple-500 text-white hover:bg-purple-600"
            }`}
          >
            {inCart ? "✓ Shtuar" : "+ Shto"}
          </button>
        </div>
      </div>
    </div>
  );
}
