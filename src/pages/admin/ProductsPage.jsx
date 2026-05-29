import { useEffect, useState } from 'react';
import { getProducts, deleteProduct, updateProduct, exportProducts } from '../../services/adminService';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = () => getProducts().then(res => setProducts(res.data));

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Je i sigurt?')) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const handleEditSave = async () => {
    await updateProduct(editProduct.id, {
      name: editProduct.name,
      brand: editProduct.brand,
      category: editProduct.category,
      price: parseFloat(editProduct.price),
    });
    setEditProduct(null);
    fetchProducts();
  };

  const handleExport = async () => {
    const res = await exportProducts();
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'products.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button onClick={handleExport} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Emri</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Çmimi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Veprime</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 text-sm">{product.id}</td>
                <td className="px-6 py-4 text-sm">{product.name}</td>
                <td className="px-6 py-4 text-sm">{product.brand}</td>
                <td className="px-6 py-4 text-sm">{product.category}</td>
                <td className="px-6 py-4 text-sm">${product.price}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button
                    onClick={() => setEditProduct(product)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                  >
                    Edito
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                  >
                    Fshi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edito Produktin</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emri</label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={editProduct.name}
                  onChange={e => setEditProduct({ ...editProduct, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={editProduct.brand}
                  onChange={e => setEditProduct({ ...editProduct, brand: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={editProduct.category}
                  onChange={e => setEditProduct({ ...editProduct, category: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Çmimi</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={editProduct.price}
                  onChange={e => setEditProduct({ ...editProduct, price: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setEditProduct(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Anulo
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Ruaj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;