import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiShoppingCart, FiSearch, FiPlus, FiCheck, FiHeart } from "react-icons/fi";
import Navbar from "../components/Navbar";

const ALL = [
  { id:1, name:"iPhone 15 Pro",     sub:"6.1‑inch Super Retina XDR",   price:129999, old:139999, cat:"Phones",    rating:4.9, reviews:2841, badge:"Best Seller", badgeBg:"rgba(245,158,11,.15)", badgeColor:"#f59e0b", img:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80" },
  { id:2, name:"MacBook Air M3",    sub:"13.6‑inch Liquid Retina",      price:149999, old:169999, cat:"Laptops",   rating:4.8, reviews:1923, badge:"New",         badgeBg:"rgba(34,197,94,.15)",  badgeColor:"#22c55e", img:"https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=400&q=80" },
  { id:3, name:"AirPods Pro",       sub:"Active Noise Cancellation",    price:24999,  old:29999,  cat:"Audio",     rating:4.7, reviews:4102, badge:"Popular",     badgeBg:"rgba(236,72,153,.15)", badgeColor:"#ec4899", img:"https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&q=80" },
  { id:4, name:"iPad Pro M4",       sub:"11‑inch Ultra Retina XDR",     price:109999, old:119999, cat:"Tablets",   rating:4.8, reviews:987,  badge:"New",         badgeBg:"rgba(99,102,241,.15)", badgeColor:"#6366f1", img:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80" },
  { id:5, name:"Apple Watch Ultra", sub:"49mm Titanium Case",           price:89999,  old:99999,  cat:"Wearables", rating:4.9, reviews:1456, badge:"Premium",     badgeBg:"rgba(139,92,246,.15)", badgeColor:"#8b5cf6", img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80" },
  { id:6, name:"Samsung Galaxy S24",sub:"6.2‑inch Dynamic AMOLED 2X",  price:79999,  old:89999,  cat:"Phones",    rating:4.6, reviews:3201, badge:"Trending",    badgeBg:"rgba(239,68,68,.15)",  badgeColor:"#ef4444", img:"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80" },
];

const CATS = [
  { label:"All",       color:"#6366f1" },
  { label:"Phones",    color:"#6366f1" },
  { label:"Laptops",   color:"#8b5cf6" },
  { label:"Audio",     color:"#ec4899" },
  { label:"Tablets",   color:"#22c55e" },
  { label:"Wearables", color:"#f59e0b" },
];

const disc = (p, o) => Math.round(((o - p) / o) * 100);

export default function Products() {
  const navigate = useNavigate();
  const [cart, setCart]     = useState([]);
  const [search, setSearch] = useState("");
  const [cat, setCat]       = useState("All");
  const [added, setAdded]   = useState({});
  const [liked, setLiked]   = useState({});

  const addToCart = (p) => {
    setCart(prev => [...prev, p]);
    setAdded(prev => ({ ...prev, [p.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [p.id]: false })), 1600);
  };

  const list = ALL.filter(p =>
    (cat === "All" || p.cat === cat) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: "#09090b" }}>
      <Navbar cartCount={cart.length} />

      {/* ── Page Header ── */}
      <div className="relative" style={{ paddingTop: "60px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="orb w-80 h-80" style={{ top: "-80px", right: "-80px", background: "rgba(99,102,241,.08)" }} />

        <div className="max-w-7xl mx-auto px-8 py-8 relative z-10">
          {/* Title row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
            <div>
              <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest mb-1">Catalogue</p>
              <h1 className="text-3xl font-bold text-white">All Products</h1>
              <p className="text-zinc-600 mt-1 text-sm">{list.length} products available</p>
            </div>

            <div className="flex gap-3 items-center">
              <div className="relative">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 text-sm" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="input pl-10 py-2.5 text-sm"
                  style={{ width: "220px" }}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/add-product")}
                className="btn btn-primary px-5 py-2.5 text-sm rounded-xl">
                <FiPlus className="text-xs" /> Add Product
              </motion.button>
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 mt-6 flex-wrap">
            {CATS.map(c => {
              const active = cat === c.label;
              return (
                <button key={c.label}
                  onClick={() => setCat(c.label)}
                  className="px-4 py-1.5 rounded-xl text-xs font-semibold transition-all"
                  style={active
                    ? { background: `${c.color}20`, color: c.color, border: `1px solid ${c.color}40` }
                    : { background: "rgba(255,255,255,0.03)", color: "#71717a", border: "1px solid rgba(255,255,255,0.06)" }
                  }>
                  {c.label}
                  {active && <span className="ml-1.5 opacity-60">({list.length})</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="max-w-7xl mx-auto px-8 py-8 pb-24">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {list.map(p => (
              <motion.div key={p.id} layout
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.28, type: "spring", bounce: 0.2 }}
                className="card-glow overflow-hidden group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-44 flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <img src={p.img}
                    className="h-28 w-auto object-contain group-hover:scale-105 transition duration-500 drop-shadow-2xl"
                    alt={p.name} />

                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="badge" style={{ background: p.badgeBg, color: p.badgeColor }}>{p.badge}</span>
                    <span className="badge" style={{ background: "rgba(239,68,68,.12)", color: "#ef4444" }}>
                      -{disc(p.price, p.old)}%
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                    onClick={() => setLiked(prev => ({ ...prev, [p.id]: !prev[p.id] }))}
                    className="absolute top-3 right-3 w-7 h-7 glass rounded-full flex items-center justify-center">
                    <FiHeart className={`text-[10px] ${liked[p.id] ? "text-rose-400" : "text-zinc-600"}`}
                      style={liked[p.id] ? { fill: "#f87171" } : {}} />
                  </motion.button>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1 mb-1.5">
                    <FiStar className="text-amber-400 text-[10px]" />
                    <span className="text-[11px] text-zinc-600">{p.rating} ({p.reviews.toLocaleString()})</span>
                    <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: p.badgeBg, color: p.badgeColor }}>{p.cat}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-tight">{p.name}</h3>
                  <p className="text-[11px] text-zinc-600 mt-0.5 truncate">{p.sub}</p>

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-white">₹{p.price.toLocaleString("en-IN")}</span>
                      <span className="text-[11px] text-zinc-600 line-through ml-1.5">₹{p.old.toLocaleString("en-IN")}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: added[p.id] ? 1 : 1.06 }}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => addToCart(p)}
                      className="btn px-3 py-1.5 text-[11px] rounded-lg transition-all"
                      style={added[p.id]
                        ? { background: "rgba(34,197,94,.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,.3)" }
                        : { background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", boxShadow: "0 4px 12px rgba(99,102,241,.3)" }
                      }>
                      {added[p.id]
                        ? <><FiCheck className="text-[10px]" /> Added!</>
                        : <><FiShoppingCart className="text-[10px]" /> Add</>}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {list.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-xl font-bold text-white">No products found</p>
            <p className="text-zinc-600 mt-1.5 text-sm">Try a different search or category</p>
            <button onClick={() => { setSearch(""); setCat("All"); }}
              className="btn btn-primary mt-5 px-6 py-2.5 text-sm rounded-xl">
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
