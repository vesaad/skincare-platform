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

  const categories = [
    "Serum",
    "Moisturizer",
    "Cleanser",
    "SPF / Krem dielli",
    "Toner",
    "Eye Cream",
  ];
  const skinTypes = ["Yndyrore", "E thatë", "Mikse", "Normale", "E ndjeshme"];
  const brands = [
    "The Ordinary",
    "CeraVe",
    "La Roche-Posay",
    "Neutrogena",
    "Paula's Choice",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const params = { page, limit: 12, q: search, ...filters };
        const res = await api.get("/products/search", { params });
        dispatch(setProducts(res.data));
      } catch {
        dispatch(setLoading(false));
      }
    };
    const timeout = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeout);
  }, [page, search, filters]);

  const toggleFilter = (key, value) => {
    setFilters((f) => ({ ...f, [key]: f[key] === value ? "" : value }));
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-56 bg-white border-r border-gray-100 p-6 flex-shrink-0">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          Filtrat
        </p>

        {/* Kategoria */}
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

        {/* Lloji i lëkurës */}
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

        {/* Marka */}
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
        {/* Header */}
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

        {/* Active Filters */}
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

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-purple-400 text-lg">Duke u ngarkuar...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* Pagination */}
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
    </div>
  );
}
