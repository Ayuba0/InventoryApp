import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

export default function Products({ user }) {
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

  // Add a new product (manager only)
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

  // Delete product (manager only)
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">
        Welcome {user?.name || "User"}{" "}
        <span className="text-gray-500 text-base">({user?.role})</span>
      </h2>

      <h3 className="text-xl font-semibold mb-4">Products</h3>

      {/* Show Add Product Form only for Managers */}
      {user?.role === "manager" && (
        <div className="flex flex-wrap gap-2 mb-6 items-center bg-white p-4 rounded shadow">
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
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add
          </button>
        </div>
      )}

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <Card key={p.id} title={p.name}>
            <p className="text-sm text-gray-600">Category: {p.category}</p>
            <p className="text-sm text-gray-600">Quantity: {p.quantity}</p>
            <p className="text-sm font-semibold text-green-600">
              ₦{Number(p.price).toLocaleString()}
            </p>

            {/* Delete button visible only for managers */}
            {user?.role === "manager" && (
              <button
                onClick={() => handleDeleteProduct(p.id)}
                className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Delete
              </button>
            )}
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No products available.</p>
      )}
    </div>
  );
}
