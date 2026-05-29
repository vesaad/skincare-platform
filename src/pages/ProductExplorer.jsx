import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading } from "../store/slices/productsSlice";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const categories = ["Serum", "Moisturizer", "Cleanser", "Sunscreen", "Toner"];

const skinTypes = [
  { label: "Oily", value: "Oily" },
  { label: "Dry", value: "Dry" },
  { label: "Combination", value: "Combination" },
  { label: "Normal", value: "Normal" },
  { label: "Sensitive", value: "Sensitive" },
];

const brands = [
  "LuxuryGlow",
  "DermaCare",
  "ClinicalSkin",
  "InfluenceX",
  "BudgetBeauty",
];

const categoryStyles = {
  Cleanser: "border-[#b9dadd] bg-[#e4f1f3] text-[#3d7880]",
  Moisturizer: "border-[#d9b9c6] bg-[#ead5dd] text-[#844D63]",
  Serum: "border-[#d5bfd5] bg-[#e8dce8] text-[#775171]",
  Sunscreen: "border-[#dcc49f] bg-[#efe0cb] text-[#9a6a35]",
  Toner: "border-[#c3d8d0] bg-[#dfe9e5] text-[#557368]",
};

export default function ProductExplorer() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((s) => s.products);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter((pageNumber) => Math.abs(pageNumber - page) <= 1)
    .slice(0, 3);
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const params = { page, limit: pageSize, q: search };
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
  }, [page, search, filters, dispatch]);

  useEffect(() => {
    if (!loading && page > totalPages) {
      setPage(totalPages);
    }
  }, [loading, page, totalPages]);

  const toggleFilter = (key, value) => {
    setFilters((currentFilters) => {
      const nextFilters = { ...currentFilters };
      if (nextFilters[key] === value) {
        delete nextFilters[key];
      } else {
        nextFilters[key] = value;
      }
      return nextFilters;
    });
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({});
    setSearch("");
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
    const chips = {
      "Hyaluronic Acid": "Hydrating",
      Ceramides: "Barrier support",
      Retinol: "Texture care",
      "Vitamin C": "Brightening",
      "Salicylic Acid": "Oil control",
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
      benefitChips: ingredientList
        .map((ingredient) => chips[ingredient])
        .filter(Boolean),
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
    const { ingredients, benefitChips } = describeIngredients(product.ingredients);
    const description = buildProductDescription(product, brand, category);

    return { brand, category, ingredients, description, benefitChips };
  };

  const selectedDetails = selectedProduct
    ? getProductDetails(selectedProduct)
    : null;

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#151712]">
      <section className="relative px-4 py-8 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_6%,rgba(132,77,99,0.14),transparent_30%),radial-gradient(circle_at_92%_10%,rgba(184,146,95,0.16),transparent_28%),linear-gradient(135deg,#fbf8f4_0%,#f7f3ec_55%,#efe7df_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 rounded-[3rem] border border-white/70 bg-white/45 p-6 shadow-2xl shadow-[#8b7a6d]/15 backdrop-blur-2xl md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.45fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#844D63]">
                  Product explorer
                </p>
                <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">
                  Browse skincare with clarity.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#62665d]">
                  Search by brand, category, and skin type, then open each
                  product for a clearer explanation of ingredients and fit.
                </p>
              </div>
              <div className="rounded-[2rem] border border-white/75 bg-white/55 p-5 shadow-sm backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#844D63]">
                  Showing
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {list.length} / {total}
                </p>
                <p className="mt-1 text-sm text-[#8b8a7f]">products found</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold uppercase tracking-[0.14em] text-[#844D63]">
                  Search
                </span>
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search products, brands, ingredients..."
                  className="w-full rounded-full border border-white/80 bg-white/70 py-4 pl-24 pr-5 text-sm text-[#151712] shadow-sm outline-none backdrop-blur-xl placeholder:text-[#aaa397] focus:border-[#844D63] focus:ring-4 focus:ring-[#ead5dd]/60"
                />
              </div>
              {(activeFilterCount > 0 || search) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-full border border-white/80 bg-white/65 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-[#844D63] shadow-sm transition hover:bg-white"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="h-fit rounded-[2.5rem] border border-white/70 bg-white/40 p-5 shadow-xl shadow-black/5 backdrop-blur-2xl lg:sticky lg:top-28">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#844D63]">
                  Filters
                </p>
                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-[#ead5dd] px-3 py-1 text-xs font-semibold text-[#844D63]">
                    {activeFilterCount}
                  </span>
                )}
              </div>

              <FilterGroup
                title="Category"
                items={categories.map((value) => ({ label: value, value }))}
                activeValue={filters.category}
                onToggle={(value) => toggleFilter("category", value)}
              />
              <FilterGroup
                title="Skin type"
                items={skinTypes}
                activeValue={filters.skinType}
                onToggle={(value) => toggleFilter("skinType", value)}
              />
              <FilterGroup
                title="Brand"
                items={brands.map((value) => ({ label: value, value }))}
                activeValue={filters.brand}
                onToggle={(value) => toggleFilter("brand", value)}
                last
              />
            </aside>

            <div>
              {Object.values(filters).some(Boolean) && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {Object.entries(filters).map(([key, value]) =>
                    value ? (
                      <span
                        key={key}
                        className="flex items-center gap-2 rounded-full bg-white/75 px-3 py-2 text-xs font-semibold text-[#844D63] ring-1 ring-white/80"
                      >
                        {value}
                        <button onClick={() => toggleFilter(key, value)}>x</button>
                      </span>
                    ) : null,
                  )}
                </div>
              )}

              {loading ? (
                <div className="flex h-80 items-center justify-center rounded-[2.5rem] border border-white/70 bg-white/45 shadow-xl shadow-black/5 backdrop-blur-2xl">
                  <div className="text-lg font-semibold text-[#844D63]">
                    Loading products...
                  </div>
                </div>
              ) : list.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {list.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={setSelectedProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-80 items-center justify-center rounded-[2.5rem] border border-dashed border-[#d9b9c6] bg-white/55 p-8 text-center shadow-xl shadow-black/5 backdrop-blur-2xl">
                  <div>
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ead5dd] text-2xl font-bold text-[#844D63]">
                      ?
                    </div>
                    <h3 className="text-lg font-semibold text-[#151712]">
                      No products match these filters
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-[#62665d]">
                      Try removing a filter or searching with a different
                      product, brand, or ingredient.
                    </p>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-5 rounded-full bg-[#151712]/90 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[#303326]"
                    >
                      Reset filters
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                  className="h-11 rounded-full border border-white/80 bg-white/65 px-4 text-xs font-semibold uppercase tracking-wide text-[#844D63] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  First page
                </button>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/65 text-[#844D63] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  &lt;
                </button>
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => setPage(number)}
                    className={`h-11 w-11 rounded-full text-sm font-semibold ${
                      page === number
                        ? "bg-[#844D63] text-white shadow-lg shadow-[#844D63]/20"
                        : "border border-white/80 bg-white/65 text-[#844D63] hover:bg-white"
                    }`}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/65 text-[#844D63] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  &gt;
                </button>
                <button
                  type="button"
                  onClick={() => setPage(totalPages)}
                  disabled={page === totalPages}
                  className="h-11 rounded-full border border-white/80 bg-white/65 px-4 text-xs font-semibold uppercase tracking-wide text-[#844D63] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Last page
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedProduct && selectedDetails && (
        <ProductModal
          product={selectedProduct}
          details={selectedDetails}
          onClose={() => setSelectedProduct(null)}
          categoryStyles={categoryStyles}
        />
      )}
    </main>
  );
}

function FilterGroup({ title, items, activeValue, onToggle, last = false }) {
  return (
    <div className={last ? "" : "mb-6"}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#62665d]">
        {title}
      </p>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <label
            key={item.value}
            className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-3 py-3 transition ${
              activeValue === item.value
                ? "border-[#844D63] bg-white text-[#844D63] shadow-sm"
                : "border-white/70 bg-white/55 text-[#62665d] hover:bg-white"
            }`}
          >
            <input
              type="checkbox"
              checked={activeValue === item.value}
              onChange={() => onToggle(item.value)}
              className="accent-[#844D63]"
            />
            <span className="text-sm font-medium">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function ProductModal({ product, details, onClose, categoryStyles }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#151712]/45 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-[2.5rem] border border-white/80 bg-[#fbf8f4]/95 shadow-2xl shadow-black/20 backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid gap-0 md:grid-cols-[280px_1fr]">
          <div className="relative flex min-h-80 items-center justify-center bg-white/55 p-8">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-64 w-full object-contain"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-[#ead5dd] text-4xl font-bold text-[#844D63]">
                {product.name?.[0] || "?"}
              </div>
            )}
            <span
              className={`absolute left-5 top-5 rounded-full border px-3 py-1 text-xs font-semibold shadow-sm ${
                categoryStyles[details.category] ||
                "border-white/80 bg-white/80 text-[#844D63]"
              }`}
            >
              {details.category}
            </span>
          </div>

          <div className="p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b948a]">
                  {details.brand}
                </p>
                <h2
                  id="product-detail-title"
                  className="mt-2 text-3xl font-semibold text-[#151712]"
                >
                  {product.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-[#844D63] hover:bg-white"
                aria-label="Close product details"
              >
                x
              </button>
            </div>

            <p className="mt-5 text-sm leading-6 text-[#62665d]">
              {details.description}
            </p>

            {details.benefitChips.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {details.benefitChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[#eadfd9] bg-white/75 px-3 py-1 text-xs font-semibold text-[#844D63]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-2xl border border-white/80 bg-white/65 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b948a]">
                  Price
                </p>
                <p className="mt-1 text-lg font-bold text-[#844D63]">
                  ${product.price}
                </p>
              </div>
              <div className="rounded-2xl border border-white/80 bg-white/65 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b948a]">
                  Category
                </p>
                <p className="mt-1 text-lg font-semibold text-[#844D63]">
                  {details.category}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b948a]">
                Ingredients
              </p>
              <p className="mt-2 text-sm text-[#4d5047]">
                {details.ingredients}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
