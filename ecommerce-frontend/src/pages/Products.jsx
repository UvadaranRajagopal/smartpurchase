import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) { navigate("/"); return; }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    if (product.quantity <= 0) { alert("Out of stock!"); return; }
    try {
      const res = await API.patch(`/products/${product.id}/reduce-stock`);
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, quantity: res.data.quantity } : p));
    } catch {
      alert("Failed to update stock.");
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      cart = cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl || null, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const previous = products;
    setProducts(prev => prev.filter(p => p.id !== id));
    try {
      await API.delete(`/products/${id}`);
    } catch (err) {
      console.error(err);
      setProducts(previous);
      alert("Failed to delete product.");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loader-page">Loading products...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="products-page">
        <div className="container">

          <div className="products-header">
            <div>
              <h1>All Products</h1>
              <p>{products.length} products available</p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn btn-outline" onClick={() => navigate("/cart")}>🛒 Cart</button>
              <button className="btn btn-primary" onClick={() => navigate("/add-product")}>+ Add Product</button>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="empty-state">
              <h3>No products yet</h3>
              <p>Add your first product to get started.</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-image-wrapper">
                    <img
                      src={product.imageUrl || `https://picsum.photos/seed/${(product.name || "product").replace(/\s+/g, "-")}/500/300`}
                      alt={product.name || "Product"}
                      onError={(e) => { e.target.src = "https://picsum.photos/500/300"; }}
                    />
                  </div>
                  <div className="product-content">
                    <h3>{product.name}</h3>
                    <p>{product.description || "Premium quality product."}</p>
                    <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "8px" }}>
                      Stock: {product.quantity}
                    </p>
                    <div className="product-bottom">
                      <h2>₹{Number(product.price).toLocaleString("en-IN")}</h2>
                      <button
                        className="btn btn-primary"
                        onClick={() => addToCart(product)}
                        disabled={product.quantity <= 0}
                      >
                        {product.quantity <= 0 ? "Out of Stock" : "Add to Cart"}
                      </button>
                      <button
                        className="btn btn-outline"
                        style={{ color: "#f87171", borderColor: "#f87171" }}
                        onClick={() => deleteProduct(product.id)}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
