export default function ProductCard({ product }) {
  return (
    <div className="bg-white border rounded-xl p-4 hover:shadow-md transition">
      <div className="bg-pink-50 rounded-lg h-32 flex items-center justify-center mb-3">
        <span className="text-4xl">🧴</span>
      </div>
      <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
      <p className="text-gray-500 text-xs mb-1">{product.brand?.name}</p>
      <p className="text-gray-500 text-xs mb-2">{product.category?.name}</p>
      <p className="font-bold text-blue-600">${product.price}</p>
      <div className="flex flex-wrap gap-1 mt-2">
        {product.productIngredients?.slice(0, 3).map((pi) => (
          <span
            key={pi.id}
            className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full"
          >
            {pi.ingredient?.name}
          </span>
        ))}
      </div>
    </div>
  );
}
