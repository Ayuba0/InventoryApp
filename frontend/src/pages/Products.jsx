import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

export default function ManagerDashboard({ user }) {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [error, setError] = useState("");

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add a new product
  const handleAddProduct = async () => {
    if (!productName || !productCategory || !productQuantity || !productPrice) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/products", {
        name: productName.trim(),
        category: productCategory.trim(),
        quantity: parseInt(productQuantity, 10),
        price: parseFloat(productPrice),
      });

      setProductName("");
      setProductCategory("");
      setProductQuantity("");
      setProductPrice("");
      setError("");

      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to add product. Try again.");
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Welcome {user?.name || "Manager"} (Manager)
      </h2>

      {/* Products Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Products</h3>

        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border p-2 rounded w-40"
          />
          <input
            type="text"
            placeholder="Category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="border p-2 rounded w-32"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            className="border p-2 rounded w-24"
          />
          <input
            type="number"
            placeholder="Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="border p-2 rounded w-24"
          />
          <button
            onClick={handleAddProduct}
            className="bg-green-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <Card key={p.id} title={p.name}>
              <p className="text-sm text-gray-600">Category: {p.category}</p>
              <p className="text-sm text-gray-600">Quantity: {p.quantity}</p>
              <p className="text-sm font-semibold">
                ₦{Number(p.price).toLocaleString()}
              </p>
              <button
                onClick={() => handleDeleteProduct(p.id)}
                className="mt-2 text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
