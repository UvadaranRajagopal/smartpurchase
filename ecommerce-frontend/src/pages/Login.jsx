import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiZap, FiEye, FiEyeOff, FiUser, FiLock, FiStar, FiShield, FiTruck } from "react-icons/fi";

const CARDS = [
  { emoji: "📱", name: "iPhone 15 Pro",  price: "₹1,29,999", style: { top: "10%",  left: "4%"  }, delay: 0   },
  { emoji: "💻", name: "MacBook Air M3", price: "₹1,49,999", style: { bottom:"12%", left: "4%"  }, delay: 1.4 },
  { emoji: "🎧", name: "AirPods Pro",    price: "₹24,999",   style: { top: "18%",  right: "4%" }, delay: 0.7 },
  { emoji: "⌚", name: "Apple Watch",    price: "₹89,999",   style: { bottom:"20%", right: "4%" }, delay: 1.8 },
];

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm]   = useState({ username: "", password: "" });
  const [show, setShow]   = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) { setError("Please fill in all fields."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { localStorage.setItem("token", "demo"); navigate("/home"); }, 900);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#09090b" }}>

      {/* ── LEFT: Brand panel ── */}
      <div className="hidden lg:flex w-[52%] relative overflow-hidden flex-col justify-center items-center">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#09090b 0%,#0f0f1a 100%)" }} />
        <div className="orb w-[420px] h-[420px]" style={{ top: "-100px", left: "-100px", background: "rgba(99,102,241,.18)" }} />
        <div className="orb w-[350px] h-[350px]" style={{ bottom: "-80px", right: "-80px", background: "rgba(139,92,246,.14)" }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Floating product cards */}
        {CARDS.map((c, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: c.delay + 0.5, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl"
            style={{ ...c.style, animation: `float 4s ease-in-out infinite ${c.delay}s` }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
              style={{ background: "rgba(99,102,241,.15)", border: "1px solid rgba(255,255,255,.08)" }}>
              {c.emoji}
            </div>
            <div>
              <p className="text-white text-xs font-semibold leading-tight">{c.name}</p>
              <p className="text-indigo-400 text-[11px] mt-0.5">{c.price}</p>
            </div>
          </motion.div>
        ))}

        {/* Center content */}
        <div className="relative z-10 text-center px-12 max-w-[380px]">
          <motion.div
            initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="w-16 h-16 rounded-2xl mx-auto mb-7 flex items-center justify-center shadow-2xl shadow-indigo-500/30"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
            <FiZap className="text-white text-3xl" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl font-bold leading-tight text-white">
            Welcome to<br />
            <span className="shimmer-text">SmartPurchase</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-3 text-zinc-500 text-sm leading-6">
            India's premium destination for next-gen electronics & luxury gadgets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-8 grid grid-cols-3 gap-3">
            {[["50K+", "Customers", "👥"], ["10K+", "Products", "📦"], ["4.9★", "Rating", "⭐"]].map(([v, l, e]) => (
              <div key={l} className="glass rounded-xl py-3 px-2 text-center">
                <p className="text-lg mb-0.5">{e}</p>
                <p className="text-base font-bold text-white">{v}</p>
                <p className="text-zinc-600 text-[10px] mt-0.5">{l}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
            className="mt-5 flex gap-2 justify-center flex-wrap">
            {[[<FiShield />, "SSL Secured"], [<FiTruck />, "Free Returns"], [<FiStar />, "Top Rated"]].map(([icon, txt]) => (
              <span key={txt} className="badge glass text-zinc-500">
                <span className="text-indigo-400">{icon}</span>{txt}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT: Form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 relative" style={{ background: "#09090b" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(99,102,241,.06) 0%, transparent 50%)" }} />

        <motion.div
          initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 w-full max-w-[380px]"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              <FiZap className="text-white text-sm" />
            </div>
            <span className="text-base font-bold text-white">
              Smart<span className="shimmer-text">Purchase</span>
            </span>
          </div>

          {/* Trust badge */}
          <div className="badge glass text-indigo-400 border border-indigo-500/20 mb-5">
            <FiStar className="text-amber-400" /> Trusted by 50,000+ shoppers
          </div>

          <h2 className="text-3xl font-bold text-white leading-tight">
            Sign in to<br />your account
          </h2>
          <p className="text-zinc-500 mt-2 text-sm">Welcome back! Enter your details below.</p>

          <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(99,102,241,.1)" }}>
                  <FiUser className="text-indigo-400 text-xs" />
                </div>
                <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
                  placeholder="Enter your username" className="input pl-12" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(139,92,246,.1)" }}>
                  <FiLock className="text-violet-400 text-xs" />
                </div>
                <input type={show ? "text" : "password"} value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Enter your password" className="input pl-12 pr-11" />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors p-1">
                  {show ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                {error}
              </motion.p>
            )}

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              type="submit" disabled={loading}
              className="btn btn-primary w-full py-3 text-sm rounded-xl mt-1">
              {loading
                ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> Signing in...</>
                : "Sign In →"}
            </motion.button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            <span className="text-zinc-700 text-xs font-semibold">OR</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>

          <p className="text-center text-zinc-600 text-sm">
            Don't have an account?{" "}
            <button onClick={() => navigate("/register")}
              className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
              Create one free →
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
