import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CATEGORIES = [
  { label: "Smartphones",  emoji: "📱", bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.3)"  },
  { label: "Laptops",      emoji: "💻", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.3)"  },
  { label: "Audio",        emoji: "🎧", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)"  },
  { label: "Cameras",      emoji: "📷", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.3)"   },
  { label: "Gaming",       emoji: "🎮", bg: "rgba(168,85,247,0.12)",  border: "rgba(168,85,247,0.3)"  },
  { label: "Accessories",  emoji: "⌚", bg: "rgba(20,184,166,0.12)",  border: "rgba(20,184,166,0.3)"  },
];

const FEATURES = [
  { icon: "🚀", title: "Fast Delivery",     desc: "Get your orders delivered within 24 hours anywhere." },
  { icon: "🔒", title: "Secure Payments",   desc: "100% secure transactions with end-to-end encryption." },
  { icon: "↩️", title: "Easy Returns",      desc: "Hassle-free 30-day return policy on all products."   },
  { icon: "🎧", title: "24/7 Support",      desc: "Round-the-clock customer support whenever you need." },
];

export default function Home() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/");
    return null;
  }

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ padding: "80px 0 60px", position: "relative", overflow: "hidden" }}>
        {/* background glow blobs */}
        <div style={{
          position: "absolute", top: "-120px", left: "-100px",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-100px", right: "-80px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>

            {/* Left */}
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
                borderRadius: "100px", padding: "6px 14px", marginBottom: "24px",
                fontSize: "13px", color: "#818cf8", fontWeight: 600,
              }}>
                ✨ New arrivals every week
              </div>

              <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "20px" }}>
                Shop the<br />
                <span style={{
                  background: "linear-gradient(135deg, #818cf8, #a78bfa, #6366f1)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>Future</span> Today.
              </h1>

              <p style={{ color: "#94a3b8", fontSize: "17px", lineHeight: 1.7, marginBottom: "36px", maxWidth: "440px" }}>
                Discover premium electronics, next-gen gadgets and luxury tech —
                curated for those who demand the best.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button
                  className="btn btn-primary"
                  style={{ padding: "14px 28px", fontSize: "15px" }}
                  onClick={() => navigate("/products")}
                >
                  Shop Now →
                </button>
                <button
                  className="btn btn-outline"
                  style={{ padding: "14px 28px", fontSize: "15px" }}
                  onClick={() => navigate("/products")}
                >
                  Explore All
                </button>
              </div>

              {/* Stats */}
              <div style={{
                display: "flex", gap: "36px", marginTop: "48px",
                paddingTop: "36px", borderTop: "1px solid rgba(255,255,255,0.06)",
              }}>
                {[["50K+","Happy Customers"],["10K+","Products"],["4.9★","Avg Rating"],["24h","Fast Delivery"]].map(([v, l]) => (
                  <div key={l}>
                    <p style={{ fontSize: "22px", fontWeight: 800, color: "white" }}>{v}</p>
                    <p style={{ fontSize: "12px", color: "#64748b", marginTop: "3px" }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — hero image */}
            <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              <div style={{
                position: "absolute", inset: "-20px",
                background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
                borderRadius: "50%",
              }} />
              <img
                src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80"
                alt="Featured product"
                style={{
                  width: "100%", maxWidth: "460px", height: "460px",
                  objectFit: "contain", borderRadius: "28px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "24px", position: "relative",
                }}
              />
              {/* floating badge */}
              <div style={{
                position: "absolute", bottom: "32px", left: "-10px",
                background: "#111827", border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: "14px", padding: "12px 18px",
                display: "flex", alignItems: "center", gap: "10px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}>
                <span style={{ fontSize: "24px" }}>🔥</span>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "white" }}>Trending Now</p>
                  <p style={{ fontSize: "11px", color: "#64748b" }}>1,200+ sold this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <p style={{ color: "#6366f1", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Browse by Category</p>
          <h2 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "32px" }}>What are you looking for?</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "16px" }}>
            {CATEGORIES.map(({ label, emoji, bg, border }) => (
              <div
                key={label}
                onClick={() => navigate("/products")}
                style={{
                  background: bg, border: `1px solid ${border}`,
                  borderRadius: "16px", padding: "24px 16px",
                  textAlign: "center", cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: "36px", marginBottom: "10px" }}>{emoji}</div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "white" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <p style={{ color: "#6366f1", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Why SmartPurchase</p>
          <h2 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "32px" }}>Built for the best experience</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: "#111827", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "18px", padding: "28px",
                transition: "border-color 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "22px", marginBottom: "16px",
                }}>{icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>{title}</h3>
                <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: "60px 0 80px" }}>
        <div className="container">
          <div style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(168,85,247,0.15) 100%)",
            border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: "24px", padding: "60px 48px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "32px", flexWrap: "wrap",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: "-60px", right: "-60px",
              width: "300px", height: "300px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <div>
              <h2 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "10px" }}>
                Ready to upgrade your tech?
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "15px" }}>
                Browse thousands of products and find your perfect match today.
              </p>
            </div>
            <button
              className="btn btn-primary"
              style={{ padding: "16px 36px", fontSize: "16px", flexShrink: 0 }}
              onClick={() => navigate("/products")}
            >
              Start Shopping →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
