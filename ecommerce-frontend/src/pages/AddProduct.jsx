import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function AddProduct() {
  const navigate    = useNavigate();
  const mountedRef  = useRef(true);

  const [form, setForm]     = useState({ name: "", description: "", price: "", quantity: "", imageUrl: "" });
  const [preview, setPreview] = useState("");
  const [error, setError]   = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth]     = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    mountedRef.current = true;
    const token = localStorage.getItem("token");
    const role  = localStorage.getItem("role");
    if (!token) { navigate("/"); setAuth(false); }
    else if (role !== "ADMIN") { navigate("/products"); setAuth(false); }
    return () => { mountedRef.current = false; };
  }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleImageUrl = (e) => {
    setForm((f) => ({ ...f, imageUrl: e.target.value }));
    setPreview(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.price || !form.quantity) { setError("Name, price and quantity are required."); return; }
    if (isNaN(form.price) || isNaN(form.quantity))   { setError("Price and quantity must be valid numbers."); return; }
    setLoading(true);
    try {
      await API.post("/products", {
        name:        form.name,
        description: form.description,
        price:       parseFloat(form.price),
        quantity:    parseInt(form.quantity),
        imageUrl:    form.imageUrl || null,
      });
      if (!mountedRef.current) return;
      setSuccess(true);
      setTimeout(() => navigate("/products"), 1200);
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err.response?.data?.message || err.response?.data?.error || "Failed to add product.");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  if (!auth) return null;

  return (
    <>
      <Navbar />
      <div className="add-product-page">
        <div className="container">
          <div className="form-card">
            <h1>Add New Product</h1>
            <p>Fill in the details to list a new product.</p>

            {error   && <div className="error-box">{error}</div>}
            {success && <div className="success-box">✓ Product added! Redirecting...</div>}

            <form onSubmit={submit}>
              <div className="input-group">
                <label>Product Name *</label>
                <input type="text" placeholder="e.g. iPhone 15 Pro" value={form.name} onChange={set("name")} />
              </div>

              <div className="input-group">
                <label>Description</label>
                <textarea placeholder="Describe the product..." value={form.description} onChange={set("description")} rows={3} style={{ resize: "vertical" }} />
              </div>

              <div className="input-group">
                <label>Image URL</label>
                <input type="url" placeholder="https://example.com/image.jpg" value={form.imageUrl} onChange={handleImageUrl} />
                {preview && (
                  <img src={preview} alt="preview" onError={() => setPreview("")}
                    style={{ marginTop: 10, width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 10 }} />
                )}
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Price (₹) *</label>
                  <input type="number" placeholder="e.g. 129999" value={form.price} onChange={set("price")} min="0" step="0.01" />
                </div>
                <div className="input-group">
                  <label>Quantity *</label>
                  <input type="number" placeholder="e.g. 50" value={form.quantity} onChange={set("quantity")} min="0" />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => navigate("/products")}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={loading}>{loading ? "Adding..." : "Add Product"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
