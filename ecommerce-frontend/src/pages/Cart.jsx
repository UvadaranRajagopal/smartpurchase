import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function getCart() {
  try { return JSON.parse(localStorage.getItem("cart") || "[]"); }
  catch { return []; }
}

function saveCart(items) {
  localStorage.setItem("cart", JSON.stringify(items));
}

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState(() => {
    const cart = getCart();
    // normalize old items that have no qty field
    const normalized = cart.map(i => ({ ...i, qty: i.qty || 1 }));
    saveCart(normalized);
    return normalized;
  });

  const update = (id, delta) => {
    const next = items
      .map(i => i.id === id ? { ...i, qty: (i.qty || 1) + delta } : i)
      .filter(i => i.qty > 0);
    setItems(next);
    saveCart(next);
  };

  const remove = (id) => {
    const next = items.filter(i => i.id !== id);
    setItems(next);
    saveCart(next);
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      <Navbar cartCount={items.length} />
      <div className="cart-page">
        <div className="container">
          <h1 className="cart-title">Your Cart</h1>

          {items.length === 0 ? (
            <div className="empty-state">
              <p style={{ fontSize: "48px", marginBottom: "16px" }}>🛒</p>
              <h3>Your cart is empty</h3>
              <p>Add some products to get started.</p>
              <button
                className="btn btn-primary"
                style={{ marginTop: "20px" }}
                onClick={() => navigate("/products")}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Items */}
              <div className="cart-items">
                {items.map(item => (
                  <div className="cart-item" key={item.id}>
                    <img
                      src={item.imageUrl || `https://picsum.photos/seed/${(item.name || "product").replace(/\s+/g, "-")}/120/120`}
                      alt={item.name}
                      className="cart-item-img"
                      onError={(e) => { e.target.src = "https://picsum.photos/120/120"; }}
                    />
                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p className="cart-item-price">
                        ₹{Number(item.price).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="cart-item-actions">
                      <div className="qty-control">
                        <button onClick={() => update(item.id, -1)}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={() => update(item.id, +1)}>+</button>
                      </div>
                      <p className="cart-item-subtotal">
                        ₹{(item.price * item.qty).toLocaleString("en-IN")}
                      </p>
                      <button className="cart-remove" onClick={() => remove(item.id)}>
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="cart-summary">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className="free-tag">FREE</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <button className="btn btn-primary" style={{ width: "100%", marginTop: "20px", padding: "14px" }}>
                  Proceed to Checkout
                </button>
                <button
                  className="btn btn-outline"
                  style={{ width: "100%", marginTop: "10px" }}
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
