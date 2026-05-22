import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiZap, FiEye, FiEyeOff, FiUser, FiMail, FiLock, FiCheckCircle, FiGift } from "react-icons/fi";
import { FaRocket } from "react-icons/fa";

const PERKS = [
  { icon: <FiCheckCircle className="text-emerald-400" />, bg: "rgba(34,197,94,.1)",  title: "Free Forever",       desc: "No hidden charges, ever" },
  { icon: <FaRocket       className="text-amber-400"  />, bg: "rgba(245,158,11,.1)", title: "Instant Access",     desc: "Start shopping immediately" },
  { icon: <FiGift         className="text-rose-400"   />, bg: "rgba(239,68,68,.1)",  title: "₹500 Welcome Bonus", desc: "On your first order" },
];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm]   = useState({ username: "", email: "", password: "" });
  const [show, setShow]   = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) { setError("Please fill in all fields."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setError(""); setLoading(true);
    setTimeout(() => navigate("/"), 900);
  };

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const sColor = ["", "bg-rose-500", "bg-amber-400", "bg-emerald-400"][strength];
  const sLabel = ["", "Weak", "Fair", "Strong"][strength];
  const sText  = ["", "text-rose-400", "text-amber-400", "text-emerald-400"][strength];

  return (
    <div className="min-h-screen flex flex-row-reverse" style={{ background: "#09090b" }}>

      {/* ── RIGHT: Brand panel ── */}
      <div className="hidden lg:flex w-[48%] relative overflow-hidden flex-col justify-center items-center">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#09090b 0%,#0f0f1a 100%)" }} />
        <div className="orb w-[380px] h-[380px]" style={{ top: "-80px", right: "-80px", background: "rgba(236,72,153,.16)" }} />
        <div className="orb w-[320px] h-[320px]" style={{ bottom: "-60px", left: "-60px", background: "rgba(99,102,241,.14)" }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 text-white px-12 max-w-[380px] w-full">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.9 }}
            className="w-16 h-16 rounded-2xl mb-7 flex items-center justify-center shadow-2xl shadow-pink-500/25"
            style={{ background: "linear-gradient(135deg,#ec4899,#8b5cf6)" }}>
            <FiZap className="text-white text-3xl" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-4xl font-bold leading-tight">
            Join the<br />
            <span className="shimmer-text">SmartPurchase</span><br />
            Family
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-3 text-zinc-500 text-sm leading-6">
            Create your free account and unlock exclusive deals on premium electronics.
          </motion.p>

          <div className="mt-8 flex flex-col gap-3">
            {PERKS.map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
                className="flex items-center gap-3.5 glass rounded-2xl px-4 py-3.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: p.bg }}>
                  {p.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">{p.title}</p>
                  <p className="text-zinc-600 text-xs mt-0.5">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LEFT: Form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 relative" style={{ background: "#09090b" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(236,72,153,.05) 0%, transparent 50%)" }} />

        <motion.div
          initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }}
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

          <div className="badge glass text-pink-400 border border-pink-500/20 mb-5">
            🎉 Join 50,000+ happy shoppers
          </div>

          <h2 className="text-3xl font-bold text-white leading-tight">
            Create your<br />free account
          </h2>
          <p className="text-zinc-500 mt-2 text-sm">Fill in the details below to get started.</p>

          <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
            {[
              { label: "Username", key: "username", type: "text",  icon: <FiUser className="text-indigo-400 text-xs" />, bg: "rgba(99,102,241,.1)",  placeholder: "Choose a username" },
              { label: "Email",    key: "email",    type: "email", icon: <FiMail className="text-pink-400 text-xs"   />, bg: "rgba(236,72,153,.1)",  placeholder: "Your email address" },
            ].map(({ label, key, type, icon, bg, placeholder }) => (
              <div key={key}>
                <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
                  {label}
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: bg }}>
                    {icon}
                  </div>
                  <input type={type} value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder} className="input pl-12" />
                </div>
              </div>
            ))}

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
                  placeholder="Create a strong password" className="input pl-12 pr-11" />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors p-1">
                  {show ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? sColor : "bg-zinc-800"}`} />
                    ))}
                  </div>
                  <span className={`text-xs font-semibold ${sText}`}>{sLabel}</span>
                </div>
              )}
            </div>

            {error && (
              <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                {error}
              </motion.p>
            )}

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              type="submit" disabled={loading}
              className="btn w-full py-3 text-sm rounded-xl mt-1 text-white"
              style={{ background: "linear-gradient(135deg,#ec4899,#8b5cf6)", boxShadow: "0 4px 20px rgba(236,72,153,.3)" }}>
              {loading
                ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> Creating...</>
                : "Create Account →"}
            </motion.button>
          </form>

          <p className="text-center text-zinc-600 text-sm mt-5">
            Already have an account?{" "}
            <button onClick={() => navigate("/")}
              className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
              Sign in →
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
