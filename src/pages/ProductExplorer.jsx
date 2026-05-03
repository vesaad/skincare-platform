import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading } from "../store/slices/productsSlice";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

export default function ProductExplorer() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.products);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      const params = { page, limit: 20, q: search, ...filters };
      const res = await api.get("/products/search", { params });
      dispatch(setProducts(res.data));
    };
    const timeout = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeout);
  }, [page, search, filters]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Product Explorer</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Kërko produkt..."
        className="border p-2 rounded w-full mb-4"
      />
      <FilterBar onFilter={setFilters} />
      {loading ? (
        <p>Duke u ngarkuar...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
      <div className="flex gap-2 mt-6 justify-center">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 border rounded"
        >
          ← Para
        </button>
        <span className="px-4 py-2">Faqja {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded"
        >
          Pas →
        </button>
      </div>
    </div>
  );
}
