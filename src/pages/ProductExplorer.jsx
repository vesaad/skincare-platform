import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading } from "../store/slices/productsSlice";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function ProductExplorer() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.products);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    "Serum",
    "Moisturizer",
    "Cleanser",
    "Sunscreen",
    "Toner",
  ];
  const skinTypes = ["Yndyrore", "E thatë", "Mikse", "Normale", "E ndjeshme"];
  const brands = [
    "LuxuryGlow",
    "DermaCare",
    "ClinicalSkin",
    "InfluenceX",
    "BudgetBeauty",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const params = { page, limit: 12, q: search };
        if (filters.category) params.category = filters.category;
        if (filters.skinType) params.skinType = filters.skinType;
        if (filters.brand) params.brand = filters.brand;
        const res = await api.get("/products/search", { params });
        dispatch(
          setProducts({
            products: res.data.products ?? [],
            total: res.data.total ?? 0,
          }),
        );
      } catch {
        dispatch(setLoading(false));
      }
    };
    const timeout = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeout);
  }, [page, search, filters]);

  const toggleFilter = (key, value) => {
    setFilters((f) => {
      const current = { ...f };
      if (current[key] === value) {
        delete current[key];
      } else {
        current[key] = value;
      }
      return current;
    });
    setPage(1);
  };

  const describeIngredients = (ingredients) => {
    const ingredientList = ingredients
      ? ingredients.split("|").map((item) => item.trim()).filter(Boolean)
      : [];

    const benefits = {
      "Hyaluronic Acid": "helps attract hydration and keep the skin feeling plump",
      Ceramides: "support the skin barrier and help reduce moisture loss",
      Retinol: "supports smoother-looking texture and targets signs of aging",
      "Vitamin C": "helps brighten the look of dull skin and supports an even tone",
      "Salicylic Acid": "helps clear excess oil and smooth clogged-looking pores",
    };

    const benefitText = ingredientList
      .map((ingredient) => benefits[ingredient])
      .filter(Boolean);

    return {
      ingredients:
        ingredientList.length > 0
          ? ingredientList.join(", ")
          : "skin-supporting ingredients",
      benefitText,
    };
  };

  const buildProductDescription = (product, brand, category) => {
    if (product.description) return product.description;

    const { ingredients, benefitText } = describeIngredients(product.ingredients);
    const categoryDescriptions = {
      Cleanser:
        "This cleanser is made for washing away daily buildup while keeping the routine simple.",
      Moisturizer:
        "This moisturizer is made to help keep the skin comfortable, hydrated, and protected from dryness.",
      Serum:
        "This serum is made as a targeted treatment step for concerns like texture, dullness, or uneven tone.",
      Sunscreen:
        "This sunscreen is made for daytime protection and works best as the final step of a morning routine.",
      Toner:
        "This toner is made as a light balancing step after cleansing and before treatment products.",
    };

    const categoryText =
      categoryDescriptions[category] ||
      "This product is made to support a simple skincare routine.";
    const benefitSentence =
      benefitText.length > 0
        ? `Its key ingredients include ${ingredients}, which ${benefitText.join(" and ")}.`
        : `Its formula includes ${ingredients}.`;

    return `${categoryText} ${benefitSentence} ${brand} ${category.toLowerCase()} is a good option to compare by ingredients and price before choosing what fits your skin needs.`;
  };

  const getProductDetails = (product) => {
    const brand =
      typeof product.brand === "string"
        ? product.brand
        : product.brand?.name || "Brand";
    const category =
      typeof product.category === "string"
        ? product.category
        : product.category?.name || "Product";
    const { ingredients } = describeIngredients(product.ingredients);
    const description = buildProductDescription(product, brand, category);

    return { brand, category, ingredients, description };
  };

  const selectedDetails = selectedProduct
    ? getProductDetails(selectedProduct)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-56 bg-white border-r border-gray-100 p-6 flex-shrink-0">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          Filtrat
        </p>

        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
          Kategoria
        </p>
        <div className="flex flex-col gap-1 mb-5">
          {categories.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category === c}
                onChange={() => toggleFilter("category", c)}
                className="accent-purple-500"
              />
              <span className="text-sm text-gray-600">{c}</span>
            </label>
          ))}
        </div>

        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
          Lloji i lëkurës
        </p>
        <div className="flex flex-col gap-1 mb-5">
          {skinTypes.map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.skinType === s}
                onChange={() => toggleFilter("skinType", s)}
                className="accent-purple-500"
              />
              <span className="text-sm text-gray-600">{s}</span>
            </label>
          ))}
        </div>

        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
          Marka
        </p>
        <div className="flex flex-col gap-1">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brand === b}
                onChange={() => toggleFilter("brand", b)}
                className="accent-purple-500"
              />
              <span className="text-sm text-gray-600">{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-xl">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Kërko produkte..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
          <p className="text-sm text-gray-400 ml-4">
            Duke shfaqur {list.length} produkte
          </p>
        </div>

        {Object.values(filters).some((v) => v) && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {Object.entries(filters).map(([k, v]) =>
              v ? (
                <span
                  key={k}
                  className="flex items-center gap-1 bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {v}
                  <button onClick={() => toggleFilter(k, v)}>×</button>
                </span>
              ) : null,
            )}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-purple-400 text-lg">Duke u ngarkuar...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {list.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-8 justify-center items-center">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            ←
          </button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-9 h-9 rounded-lg text-sm font-medium ${page === n ? "bg-purple-500 text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-100"}`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => p + 1)}
            className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            →
          </button>
        </div>
      </div>

      {selectedProduct && selectedDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-detail-title"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid gap-0 md:grid-cols-[240px_1fr]">
              <div className="relative flex min-h-64 items-center justify-center bg-gray-50 p-6">
                {selectedProduct.imageUrl ? (
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="max-h-56 w-full object-contain"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-purple-50 text-4xl font-bold text-purple-600">
                    {selectedProduct.name?.[0] || "?"}
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-purple-600 shadow-sm">
                  {selectedDetails.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {selectedDetails.brand}
                    </p>
                    <h2
                      id="product-detail-title"
                      className="mt-1 text-2xl font-bold text-gray-900"
                    >
                      {selectedProduct.name}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Close product details"
                  >
                    x
                  </button>
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {selectedDetails.description}
                </p>

                <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Price
                    </p>
                    <p className="mt-1 font-bold text-gray-900">
                      ${selectedProduct.price}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Category
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {selectedDetails.category}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Ingredients
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    {selectedDetails.ingredients}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
