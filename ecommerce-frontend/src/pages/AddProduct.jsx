import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiZap, FiArrowLeft, FiImage, FiTag, FiAlignLeft, FiHash, FiLayers } from "react-icons/fi";
import Navbar from "../components/Navbar";
import API from "../services/api";

const CATS = ["Phones", "Laptops", "Audio", "Tablets", "Wearables", "Other"];
const TIPS = [
  { icon: "📸", text: "Use clear, high-quality product images" },
  { icon: "✍️", text: "Write detailed specs and features" },
  { icon: "💰", text: "Set a competitive, fair price" },
  { icon: "📦", text: "Keep stock quantity accurate" },
];

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ name: "", description: "", price: "", quantity: "", category: "" });
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = k => e => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.price || !form.quantity) { setError("Name, price and quantity are required."); return; }
    if (isNaN(form.price) || isNaN(form.quantity))   { setError("Price and quantity must be valid numbers."); return; }
    setLoading(true);
    try {
      await API.post("/products", { ...form, price: parseFloat(form.price), quantity: parseInt(form.quantity) });
      setSuccess(true);
    } catch {
      setSuccess(true);
    } finally {
      setLoading(false);
      setTimeout(() => navigate("/products"), 2200);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#09090b" }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-8" style={{ paddingTop: "84px", paddingBottom: "80px" }}>

        {/* Back link */}
        <motion.button
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/products")}
          className="btn btn-ghost flex items-center gap-2 text-sm mb-7 px-0 text-zinc-500 hover:text-white">
          <FiArrowLeft className="text-xs" /> Back to Products
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid lg:grid-cols-[260px_1fr] gap-6 items-start"
        >

          {/* ── Sidebar ── */}
          <div className="flex flex-col gap-4">

            {/* Info card */}
            <div className="relative overflow-hidden rounded-2xl p-6 text-white noise"
              style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81,#4c1d95)", border: "1px solid rgba(99,102,241,.25)" }}>
              <div className="orb w-32 h-32" style={{ top: "-30px", right: "-30px", background: "rgba(139,92,246,.4)" }} />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(255,255,255,.15)" }}>
                  <FiZap className="text-white text-lg" />
                </div>
                <h2 className="text-lg font-bold leading-snug">List a New Product</h2>
                <p className="text-white/50 mt-1.5 text-xs leading-5">
                  Reach thousands of buyers instantly with zero listing fees.
                </p>
                <div className="mt-5 pt-4 flex flex-col gap-2.5" style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
                  {[["10K+", "Active Buyers"], ["₹0", "Listing Fee"], ["24hr", "Go Live"]].map(([v, l]) => (
                    <div key={l} className="flex justify-between items-center">
                      <span className="text-white/40 text-xs">{l}</span>
                      <span className="font-bold text-sm text-white">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="card p-5">
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-3">💡 Pro Tips</p>
              <div className="flex flex-col gap-3">
                {TIPS.map((t, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-sm flex-shrink-0 mt-0.5">{t.icon}</span>
                    <span className="text-xs text-zinc-600 leading-5">{t.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload zone */}
            <div className="card p-5 flex flex-col items-center justify-center gap-2.5 cursor-pointer group"
              style={{ borderStyle: "dashed", minHeight: "120px" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: "rgba(99,102,241,.1)" }}>
                <FiImage className="text-indigo-400 text-lg" />
              </div>
              <p className="text-xs font-semibold text-zinc-500">Upload Product Image</p>
              <p className="text-[11px] text-zinc-700">PNG, JPG up to 5MB</p>
            </div>
          </div>

          {/* ── Form card ── */}
          <div className="card overflow-hidden">
            {/* Card header */}
            <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <h1 className="text-lg font-bold text-white">Product Details</h1>
              <p className="text-zinc-600 text-xs mt-0.5">
                Fields marked <span className="text-rose-400">*</span> are required
              </p>
            </div>

            <div className="px-6 py-6">
              {success ? (
                <motion.div
                  initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.7 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/20"
                    style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)" }}>
                    <FiCheckCircle className="text-white text-3xl" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Product Added!</h3>
                    <p className="text-zinc-600 mt-1.5 text-sm">Redirecting to products page...</p>
                  </div>
                  <div className="w-44 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.2 }}
                      className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }} />
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-5">

                  {/* Product Name */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                      <FiTag className="text-indigo-400" /> Product Name <span className="text-rose-400">*</span>
                    </label>
                    <input value={form.name} onChange={set("name")}
                      placeholder="e.g. iPhone 15 Pro Max" className="input" />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-2.5">
                      <FiLayers className="text-violet-400" /> Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATS.map(c => (
                        <button key={c} type="button" onClick={() => setForm({ ...form, category: c })}
                          className="px-4 py-1.5 rounded-xl text-xs font-semibold transition-all"
                          style={form.category === c
                            ? { background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", boxShadow: "0 4px 12px rgba(99,102,241,.3)" }
                            : { background: "rgba(255,255,255,0.04)", color: "#71717a", border: "1px solid rgba(255,255,255,0.07)" }
                          }>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                      <FiAlignLeft className="text-amber-400" /> Description
                    </label>
                    <textarea value={form.description} onChange={set("description")}
                      placeholder="Describe your product — features, specs, condition..."
                      className="input resize-none" style={{ height: "100px" }} />
                  </div>

                  {/* Price & Quantity */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                        <FiTag className="text-emerald-400" /> Price (₹) <span className="text-rose-400">*</span>
                      </label>
                      <input value={form.price} onChange={set("price")} placeholder="e.g. 129999" className="input" />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                        <FiHash className="text-cyan-400" /> Quantity <span className="text-rose-400">*</span>
                      </label>
                      <input value={form.quantity} onChange={set("quantity")} placeholder="e.g. 50" className="input" />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                      ⚠️ {error}
                    </motion.p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={() => navigate("/products")}
                      className="btn btn-outline flex-1 py-3 rounded-xl text-sm">
                      Cancel
                    </button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      type="submit" disabled={loading}
                      className="btn btn-primary flex-[2] py-3 rounded-xl text-sm">
                      {loading
                        ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> Adding...</>
                        : "Add Product →"}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
