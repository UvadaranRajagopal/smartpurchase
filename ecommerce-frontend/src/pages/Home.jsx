import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiStar, FiHeart, FiArrowRight, FiShield, FiTruck, FiZap, FiTag, FiShoppingCart } from "react-icons/fi";
import Navbar from "../components/Navbar";

const PRODUCTS = [
  { id:1, name:"iPhone 15 Pro",  sub:"Titanium. So strong. So light.",  price:"₹1,29,999", old:"₹1,39,999", rating:4.9, reviews:2841, badge:"Best Seller", badgeBg:"rgba(245,158,11,.15)", badgeColor:"#f59e0b", img:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80" },
  { id:2, name:"MacBook Air M3", sub:"Supercharged by M3.",             price:"₹1,49,999", old:"₹1,69,999", rating:4.8, reviews:1923, badge:"New Arrival", badgeBg:"rgba(34,197,94,.15)",  badgeColor:"#22c55e", img:"https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=400&q=80" },
  { id:3, name:"AirPods Pro",    sub:"Adaptive Audio. Now playing.",    price:"₹24,999",   old:"₹29,999",   rating:4.7, reviews:4102, badge:"Hot Deal",    badgeBg:"rgba(239,68,68,.15)",  badgeColor:"#ef4444", img:"https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&q=80" },
];

const CATS = [
  { label:"Phones",      emoji:"📱", color:"#6366f1", bg:"rgba(99,102,241,.1)"  },
  { label:"Laptops",     emoji:"💻", color:"#8b5cf6", bg:"rgba(139,92,246,.1)"  },
  { label:"Audio",       emoji:"🎧", color:"#ec4899", bg:"rgba(236,72,153,.1)"  },
  { label:"Tablets",     emoji:"📲", color:"#22c55e", bg:"rgba(34,197,94,.1)"   },
  { label:"Wearables",   emoji:"⌚", color:"#f59e0b", bg:"rgba(245,158,11,.1)"  },
  { label:"Accessories", emoji:"🔌", color:"#06b6d4", bg:"rgba(6,182,212,.1)"   },
];

const FEATURES = [
  { icon:<FiTruck />,  color:"#6366f1", bg:"rgba(99,102,241,.12)",  title:"Free Delivery",     desc:"On orders above ₹999" },
  { icon:<FiShield />, color:"#22c55e", bg:"rgba(34,197,94,.12)",   title:"2-Year Warranty",   desc:"On all products" },
  { icon:<FiZap />,    color:"#f59e0b", bg:"rgba(245,158,11,.12)",  title:"Same Day Dispatch", desc:"Order before 2 PM" },
  { icon:<FiTag />,    color:"#ec4899", bg:"rgba(236,72,153,.12)",  title:"Best Price",        desc:"Price match guarantee" },
];

const fu = (d = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
});

export default function Home() {
  const navigate = useNavigate();
  const [cart, setCart]   = useState([]);
  const [liked, setLiked] = useState({});

  return (
    <div className="min-h-screen" style={{ background: "#09090b" }}>
      <Navbar cartCount={cart.length} />

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden" style={{ paddingTop: "60px" }}>
        <div className="orb w-[500px] h-[500px]" style={{ top: "-150px", left: "-150px", background: "rgba(99,102,241,.14)" }} />
        <div className="orb w-[400px] h-[400px]" style={{ top: "-80px", right: "-120px", background: "rgba(139,92,246,.1)" }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />

        <div className="max-w-7xl mx-auto px-8 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left copy */}
          <motion.div {...fu()}>
            <div className="badge glass text-indigo-400 border border-indigo-500/20 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              India's #1 Premium Electronics Store
            </div>

            <h1 className="text-6xl font-bold leading-[1.06] tracking-tight text-white">
              Shop the<br />
              <span className="grad-text">Future</span><br />
              Today.
            </h1>

            <p className="text-zinc-500 text-base mt-5 leading-7 max-w-md">
              Discover premium electronics, next-gen gadgets and luxury tech — curated for those who demand the best.
            </p>

            <div className="flex gap-3 mt-8">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/products")}
                className="btn btn-primary px-7 py-3 text-sm rounded-xl">
                Shop Now <FiArrowRight />
              </motion.button>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/products")}
                className="btn btn-outline px-7 py-3 text-sm rounded-xl">
                Explore All
              </motion.button>
            </div>

            <div className="flex gap-8 mt-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {[["50K+", "Customers"], ["10K+", "Products"], ["4.9★", "Rating"], ["₹500", "Bonus"]].map(([v, l]) => (
                <div key={l}>
                  <p className="text-lg font-bold text-white">{v}</p>
                  <p className="text-zinc-600 text-xs mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex justify-center items-center"
          >
            <div className="orb w-72 h-72" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "rgba(99,102,241,.15)" }} />

            <div className="relative">
              {/* Product frame */}
              <div className="w-64 h-64 rounded-3xl flex items-center justify-center float"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <img src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80"
                  className="w-48 h-48 object-contain drop-shadow-2xl" alt="iPhone 15 Pro" />
              </div>

              {/* Badge: Top Rated */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
                className="absolute glass rounded-2xl px-3 py-2.5 float2"
                style={{ right: "-56px", top: "24px" }}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(245,158,11,.15)" }}>
                    <FiStar className="text-amber-400 text-xs" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold leading-tight">Top Rated</p>
                    <p className="text-zinc-600 text-[10px]">4.9 / 5.0 stars</p>
                  </div>
                </div>
              </motion.div>

              {/* Badge: Free Delivery */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
                className="absolute glass rounded-2xl px-3 py-2.5 float"
                style={{ left: "-56px", bottom: "48px" }}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(34,197,94,.15)" }}>
                    <FiTruck className="text-emerald-400 text-xs" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold leading-tight">Free Delivery</p>
                    <p className="text-zinc-600 text-[10px]">Above ₹999</p>
                  </div>
                </div>
              </motion.div>

              {/* Badge: Orders */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
                className="absolute glass rounded-2xl px-4 py-2.5 whitespace-nowrap"
                style={{ bottom: "-20px", left: "50%", transform: "translateX(-50%)" }}>
                <div className="flex items-center gap-2.5">
                  <div className="flex -space-x-1">
                    {["🧑", "👩", "👨"].map((e, i) => (
                      <div key={i} className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] border"
                        style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderColor: "#09090b" }}>{e}</div>
                    ))}
                  </div>
                  <p className="text-white text-xs font-semibold">1,284 orders today</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div key={i} {...fu(i * 0.07)}
              className="card p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: f.bg }}>
                <span style={{ color: f.color, fontSize: "15px" }}>{f.icon}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{f.title}</p>
                <p className="text-xs text-zinc-600 mt-0.5">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ CATEGORIES ══ */}
      <section className="py-10 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest mb-1">Browse</p>
              <h2 className="text-2xl font-bold text-white">Shop by Category</h2>
            </div>
            <button onClick={() => navigate("/products")}
              className="text-indigo-400 text-sm font-semibold flex items-center gap-1.5 hover:text-indigo-300 transition-colors">
              See all <FiArrowRight className="text-xs" />
            </button>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {CATS.map((c, i) => (
              <motion.button key={c.label} {...fu(i * 0.05)}
                whileHover={{ scale: 1.04, y: -3 }}
                onClick={() => navigate("/products")}
                className="card p-4 flex flex-col items-center gap-2.5 cursor-pointer group">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform"
                  style={{ background: c.bg }}>
                  {c.emoji}
                </div>
                <p className="text-xs font-semibold text-zinc-400">{c.label}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PRODUCTS ══ */}
      <section className="py-10 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest mb-1">Handpicked</p>
              <h2 className="text-2xl font-bold text-white">Featured Products</h2>
            </div>
            <button onClick={() => navigate("/products")}
              className="text-indigo-400 text-sm font-semibold flex items-center gap-1.5 hover:text-indigo-300 transition-colors">
              View all <FiArrowRight className="text-xs" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {PRODUCTS.map((p, i) => (
              <motion.div key={p.id} {...fu(i * 0.1)} className="card-glow overflow-hidden group">
                {/* Image area */}
                <div className="relative h-48 flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <img src={p.img}
                    className="h-32 w-auto object-contain group-hover:scale-105 transition duration-500 drop-shadow-2xl"
                    alt={p.name} />
                  <span className="absolute top-3 left-3 badge" style={{ background: p.badgeBg, color: p.badgeColor }}>
                    {p.badge}
                  </span>
                  <button onClick={() => setLiked(prev => ({ ...prev, [p.id]: !prev[p.id] }))}
                    className="absolute top-3 right-3 w-8 h-8 glass rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <FiHeart className={`text-xs ${liked[p.id] ? "text-rose-400" : "text-zinc-600"}`}
                      style={liked[p.id] ? { fill: "#f87171" } : {}} />
                  </button>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <FiStar className="text-amber-400 text-xs" />
                    <span className="text-xs text-zinc-500">{p.rating} ({p.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-tight">{p.name}</h3>
                  <p className="text-xs text-zinc-600 mt-1">{p.sub}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold text-white">{p.price}</span>
                      <span className="text-xs text-zinc-600 line-through ml-2">{p.old}</span>
                    </div>
                    <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
                      onClick={() => setCart(prev => [...prev, p])}
                      className="btn btn-primary px-4 py-2 text-xs rounded-xl">
                      <FiShoppingCart className="text-xs" /> Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="py-10 px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fu()}
            className="relative overflow-hidden rounded-2xl p-10 flex flex-col md:flex-row justify-between items-center gap-8 noise"
            style={{ background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#4c1d95 100%)", border: "1px solid rgba(99,102,241,.25)" }}>
            <div className="orb w-56 h-56" style={{ top: "-60px", right: "-30px", background: "rgba(139,92,246,.3)" }} />
            <div className="orb w-40 h-40" style={{ bottom: "-50px", left: "35%", background: "rgba(236,72,153,.2)" }} />

            <div className="relative z-10 text-white">
              <span className="badge glass text-white/60 border border-white/10 mb-4">
                🔥 Limited Time Offer
              </span>
              <h2 className="text-3xl font-bold leading-tight">
                Get <span className="text-amber-300">20% OFF</span> your first order
              </h2>
              <p className="text-white/50 mt-3 text-sm">
                Use code{" "}
                <span className="font-bold text-white bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">SMART20</span>
                {" "}at checkout
              </p>
            </div>

            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/products")}
              className="relative z-10 btn bg-white text-indigo-900 font-bold px-8 py-3 text-sm rounded-xl shadow-xl flex items-center gap-2 flex-shrink-0 hover:bg-gray-50 transition-colors">
              Explore Store <FiArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
