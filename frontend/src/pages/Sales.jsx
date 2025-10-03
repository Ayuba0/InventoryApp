import React, { useEffect, useState } from "react";
import axios from "axios";

function Sales({ user }) {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [saleQuantity, setSaleQuantity] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch sales
  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sales");
      setSales(res.data);
    } catch (err) {
      console.error("Error fetching sales:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  // Auto-calc total
  useEffect(() => {
    const product = products.find((p) => p.id === parseInt(selectedProduct));
    if (product && saleQuantity) {
      setTotalAmount(product.price * saleQuantity);
    } else {
      setTotalAmount(0);
    }
  }, [selectedProduct, saleQuantity, products]);

  // Record Sale
  const handleRecordSale = async () => {
    if (!selectedProduct || !saleQuantity) {
      alert("Please select a product and enter quantity.");
      return;
    }
    if (!user || !user.id) {
      alert("User not loaded. Please try again.");
      return;
  }

    try {
      const product = products.find((p) => p.id === parseInt(selectedProduct));

      if (saleQuantity > product.quantity) {
        alert("Not enough stock!");
        return;
      }

      await axios.post("http://localhost:5000/api/sales", {
        product_id: parseInt(selectedProduct),
        quantity_sold: parseInt(saleQuantity),
        cashier_id: user.id,
      });

      setSelectedProduct("");
      setSaleQuantity("");
      setTotalAmount(0);

      fetchProducts();
      fetchSales();
    } catch (err) {
      console.error("Error recording sale:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Sales Management
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Record Sale Section */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Record a Sale
            </h2>
            <div className="flex flex-col gap-4">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg focus:ring focus:ring-green-300"
              >
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.quantity} in stock)
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Quantity"
                value={saleQuantity}
                onChange={(e) => setSaleQuantity(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg focus:ring focus:ring-green-300"
              />

              {totalAmount > 0 && (
                <p className="text-lg font-semibold text-gray-700">
                  Total:{" "}
                  <span className="text-green-600">
                    ₦{totalAmount.toFixed(2)}
                  </span>
                </p>
              )}

              <button
                onClick={handleRecordSale}
                className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Record Sale
              </button>
            </div>
          </div>

          {/* Sales History Section */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Recent Sales
            </h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {sales.length > 0 ? (
                sales.map((s) => (
                  <div
                    key={s.id}
                    className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition bg-gray-50"
                  >
                    <h3 className="font-bold text-gray-800">
                      {s.product_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {s.quantity_sold}
                    </p>
                    <p className="text-sm text-gray-600">
                      Amount: ₦{Number(s.total_price).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Sold by <span className="font-medium">{s.cashier_name}</span> on{" "}
                      {new Date(s.date).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No sales yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;
