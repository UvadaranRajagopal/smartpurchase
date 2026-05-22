import { useNavigate, useLocation } from "react-router-dom";
import { FiShoppingCart, FiPlus, FiLogOut, FiHome, FiGrid, FiZap } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ cartCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: "Home",        path: "/home",        icon: <FiHome /> },
    { label: "Products",    path: "/products",    icon: <FiGrid /> },
    { label: "Add Product", path: "/add-product", icon: <FiPlus /> },
  ];

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .5, ease: [.25,.46,.45,.94] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="glass border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => navigate("/home")} className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
              <FiZap className="text-white text-sm" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#09090b]" />
            </div>
            <span className="text-[15px] font-bold text-white tracking-tight" style={{fontFamily:"Space Grotesk,sans-serif"}}>
              Smart<span className="shimmer-text">Purchase</span>
            </span>
          </button>

          {/* Pill nav */}
          <div className="flex items-center gap-0.5 p-1 rounded-2xl" style={{background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)"}}>
            {links.map(({ label, path, icon }) => {
              const active = location.pathname === path;
              return (
                <button key={path} onClick={() => navigate(path)}
                  className="relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium transition-colors z-10"
                  style={{ color: active ? "#fff" : "#71717a" }}
                >
                  {active && (
                    <motion.div layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
                      transition={{ type: "spring", bounce: .2, duration: .4 }}
                    />
                  )}
                  <span className="relative z-10 text-xs">{icon}</span>
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .95 }}
              onClick={() => navigate("/products")}
              className="btn btn-primary relative px-5 py-2.5 text-[13px] rounded-xl"
            >
              <FiShoppingCart className="text-sm" />
              Cart
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span key={cartCount}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-rose-500/40"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button onClick={() => { localStorage.removeItem("token"); navigate("/"); }}
              className="btn btn-ghost px-3 py-2.5 text-[13px] rounded-xl flex items-center gap-1.5 hover:text-rose-400">
              <FiLogOut className="text-sm" /> Logout
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
