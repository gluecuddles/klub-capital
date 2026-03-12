import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ── Fonts loaded via @import in a style tag ──────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      background: #F7F6F3;
      color: #1C1C1C;
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      -webkit-font-smoothing: antialiased;
    }

    .serif { font-family: 'Cormorant Garamond', serif; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #F7F6F3; }
    ::-webkit-scrollbar-thumb { background: #C7A96B; border-radius: 2px; }

    .noise-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none;
      opacity: 0.4;
    }

    .thin-rule { border: none; border-top: 1px solid #E4E4E4; }

    .accent-line {
      display: inline-block;
      width: 32px;
      height: 1px;
      background: #C7A96B;
      vertical-align: middle;
    }

    .tab-active {
      border-bottom: 1px solid #1C1C1C;
      color: #1C1C1C;
    }

    .tab-inactive {
      color: #6B6B6B;
    }

    input, select, textarea {
      background: transparent;
      border: none;
      border-bottom: 1px solid #E4E4E4;
      outline: none;
      width: 100%;
      padding: 10px 0;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 300;
      color: #1C1C1C;
      transition: border-color 0.2s;
    }

    input::placeholder, textarea::placeholder {
      color: #ABABAB;
      font-weight: 300;
    }

    input:focus, select:focus, textarea:focus {
      border-bottom-color: #C7A96B;
    }

    select {
      appearance: none;
      cursor: pointer;
      color: #1C1C1C;
    }

    select option { background: #F7F6F3; }

    textarea { resize: none; }

    .btn-primary {
      display: inline-block;
      padding: 13px 32px;
      border: 1px solid #1C1C1C;
      background: #1C1C1C;
      color: #F7F6F3;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      text-transform: uppercase;
    }

    .btn-primary:hover {
      background: #C7A96B;
      border-color: #C7A96B;
      color: #fff;
    }

    .btn-outline {
      display: inline-block;
      padding: 13px 32px;
      border: 1px solid #1C1C1C;
      background: transparent;
      color: #1C1C1C;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      text-transform: uppercase;
    }

    .btn-outline:hover {
      background: #1C1C1C;
      color: #F7F6F3;
    }

    .text-link {
      font-size: 13px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #1C1C1C;
      border-bottom: 1px solid #C7A96B;
      padding-bottom: 1px;
      cursor: pointer;
      text-decoration: none;
      transition: color 0.2s;
    }

    .text-link:hover { color: #C7A96B; }

    @media (max-width: 768px) {
      .mobile-hidden { display: none; }
      .mobile-menu-open { display: flex; flex-direction: column; }
    }
  `}</style>
);

// ── Fade-in on scroll ────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["About", "Investors", "Businesses", "How It Works", "Apply"];

  return (
    <motion.nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: scrolled ? "rgba(247,246,243,0.96)" : "transparent",
        borderBottom: scrolled ? "1px solid #E4E4E4" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.4s ease",
        padding: "0 40px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <div className="serif" style={{ fontSize: 18, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Klub Capital
        </div>

        {/* Desktop links */}
        <div className="mobile-hidden" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {links.map((l) => (
            <a key={l} href="#" style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B6B6B", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#1C1C1C"}
              onMouseLeave={e => e.target.style.color = "#6B6B6B"}
            >{l}</a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4 }}
          className="mobile-only"
          id="hamburger"
        >
          <div style={{ width: 22, height: 1, background: "#1C1C1C", marginBottom: 6 }} />
          <div style={{ width: 14, height: 1, background: "#1C1C1C" }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ background: "#F7F6F3", borderTop: "1px solid #E4E4E4", padding: "24px 40px 32px" }}>
            {links.map((l) => (
              <a key={l} href="#" style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B6B6B", textDecoration: "none", padding: "10px 0", borderBottom: "1px solid #F0EFE9" }}>{l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          #hamburger { display: block !important; }
          .mobile-hidden { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
};

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 40px 80px", position: "relative", overflow: "hidden" }}>
    {/* Background grid */}
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#E4E4E4 1px, transparent 1px), linear-gradient(90deg, #E4E4E4 1px, transparent 1px)", backgroundSize: "72px 72px", opacity: 0.25 }} />
    {/* Radial glow */}
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(199,169,107,0.07) 0%, transparent 70%)" }} />

    <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 40 }}>
          <span style={{ display: "block", width: 28, height: "1px", background: "#C7A96B" }} />
          <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C7A96B", fontWeight: 400 }}>Invite-only private capital network</span>
          <span style={{ display: "block", width: 28, height: "1px", background: "#C7A96B" }} />
        </div>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        className="serif"
        style={{ fontSize: "clamp(44px, 7vw, 86px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.01em", color: "#1C1C1C", marginBottom: 28 }}>
        Private capital.<br />
        <em style={{ fontStyle: "italic", fontWeight: 300 }}>Curated opportunities.</em>
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
        style={{ fontSize: 17, fontWeight: 300, color: "#6B6B6B", lineHeight: 1.75, maxWidth: 520, margin: "0 auto 48px" }}>
        Klub Capital is an invite-only network connecting serious investors with investor-ready businesses.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
        style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
        <button className="btn-primary">Apply as Investor</button>
        <button className="btn-outline">Submit a Business</button>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.65 }}
        style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
        {["Selective access", "Structured discovery", "Serious capital only"].map((t, i) => (
          <span key={i} style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ABABAB" }}>{t}</span>
        ))}
      </motion.div>
    </div>

    {/* Bottom fade */}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(transparent, #F7F6F3)" }} />
  </section>
);

// ── Quiet Statement ──────────────────────────────────────────────────────────
const QuietStatement = () => (
  <section style={{ padding: "80px 40px", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
    <hr className="thin-rule" style={{ marginBottom: 80 }} />
    <Reveal>
      <p className="serif" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 300, lineHeight: 1.5, color: "#1C1C1C", marginBottom: 40, fontStyle: "italic" }}>
        Private markets were never designed for noise.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          "Investors spend time filtering irrelevant opportunities.",
          "Businesses struggle to reach the right capital.",
          "Klub Capital exists to bring structure and clarity to that interaction."
        ].map((line, i) => (
          <p key={i} style={{ fontSize: 16, fontWeight: 300, color: i === 2 ? "#1C1C1C" : "#6B6B6B", lineHeight: 1.7 }}>{line}</p>
        ))}
      </div>
    </Reveal>
  </section>
);

// ── Problem ──────────────────────────────────────────────────────────────────
const Problem = () => {
  const investors = ["Too many irrelevant pitches", "Limited visibility beyond existing networks", "Poor founder preparation", "Time lost filtering weak opportunities"];
  const businesses = ["Limited access to serious investors", "Fundraising often starts too early", "Financials are not always presented clearly", "Strong businesses get lost in weak outreach"];

  return (
    <section style={{ background: "#EFEDE7", padding: "100px 40px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C7A96B", marginBottom: 24 }}>The challenge</p>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, marginBottom: 72, lineHeight: 1.2 }}>Where the friction begins</h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64 }}>
          {[{ title: "For Investors", items: investors }, { title: "For Businesses", items: businesses }].map((col, ci) => (
            <Reveal key={ci} delay={ci * 0.15}>
              <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 32 }}>{col.title}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {col.items.map((item, i) => (
                  <div key={i} style={{ padding: "18px 0", borderTop: "1px solid #DDD9D0" }}>
                    <p style={{ fontSize: 15, fontWeight: 300, color: "#1C1C1C", lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <hr className="thin-rule" style={{ marginTop: 64, marginBottom: 40 }} />
          <p style={{ fontSize: 15, fontWeight: 300, color: "#6B6B6B", lineHeight: 1.8, maxWidth: 680 }}>
            Klub Capital reduces friction by making opportunities more structured, selective, and relevant.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

// ── Solution ─────────────────────────────────────────────────────────────────
const Solution = () => {
  const blocks = [
    { label: "01", title: "Capital Readiness", body: "Businesses are prepared with greater clarity before they are presented to investors." },
    { label: "02", title: "Curated Deal Flow", body: "Only selected opportunities move forward. Quality matters more than volume." },
    { label: "03", title: "Relevant Introductions", body: "Investors see opportunities aligned with sector, size, stage, and interest." },
  ];

  return (
    <section style={{ padding: "100px 40px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Reveal>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 300, marginBottom: 72, lineHeight: 1.3, maxWidth: 600 }}>
            A more intelligent way to connect capital and opportunity.
          </h2>
        </Reveal>
        {blocks.map((b, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 2fr", gap: 40, padding: "40px 0", borderTop: "1px solid #E4E4E4", alignItems: "start" }}>
              <span style={{ fontSize: 11, color: "#C7A96B", letterSpacing: "0.1em", paddingTop: 2 }}>{b.label}</span>
              <p className="serif" style={{ fontSize: 22, fontWeight: 400, color: "#1C1C1C", lineHeight: 1.3 }}>{b.title}</p>
              <p style={{ fontSize: 15, fontWeight: 300, color: "#6B6B6B", lineHeight: 1.75 }}>{b.body}</p>
            </div>
          </Reveal>
        ))}
        <div style={{ borderTop: "1px solid #E4E4E4" }} />
      </div>
    </section>
  );
};

// ── Audience ─────────────────────────────────────────────────────────────────
const Audience = () => {
  const cols = [
    {
      label: "For Investors",
      desc: "Discover curated private opportunities without unnecessary noise.",
      items: ["Sector-aligned opportunities", "Relevant deal flow", "Structured visibility", "Selective access"],
      cta: "Join as Investor",
    },
    {
      label: "For Businesses",
      desc: "Access serious capital once your business is ready to be seen.",
      items: ["Readiness-focused intake", "Selective review", "Capital matching", "Stronger investor positioning"],
      cta: "Apply as a Business",
    },
  ];

  return (
    <section style={{ background: "#EFEDE7", padding: "100px 40px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 2 }}>
        {cols.map((col, ci) => (
          <Reveal key={ci} delay={ci * 0.15}>
            <div style={{ padding: "60px 48px", background: ci === 0 ? "#F7F6F3" : "#1C1C1C", minHeight: 480, display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: ci === 0 ? "#C7A96B" : "#C7A96B", marginBottom: 24 }}>{col.label}</p>
              <p style={{ fontSize: 17, fontWeight: 300, color: ci === 0 ? "#1C1C1C" : "#F7F6F3", lineHeight: 1.7, marginBottom: 40 }}>{col.desc}</p>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0, marginBottom: 48 }}>
                {col.items.map((item, i) => (
                  <div key={i} style={{ padding: "14px 0", borderTop: `1px solid ${ci === 0 ? "#E4E4E4" : "rgba(255,255,255,0.1)"}` }}>
                    <p style={{ fontSize: 14, fontWeight: 300, color: ci === 0 ? "#6B6B6B" : "rgba(247,246,243,0.7)" }}>{item}</p>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${ci === 0 ? "#E4E4E4" : "rgba(255,255,255,0.1)"}` }} />
              </div>
              <a className="text-link" href="#" style={{ color: ci === 0 ? "#1C1C1C" : "#C7A96B", borderBottomColor: ci === 0 ? "#C7A96B" : "#C7A96B" }}>{col.cta}</a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// ── How It Works ─────────────────────────────────────────────────────────────
const HowItWorks = () => {
  const steps = [
    { n: "1", title: "Apply privately", body: "Submit your application through our confidential intake process." },
    { n: "2", title: "Get reviewed and profiled", body: "Our team reviews each application to assess fit and readiness." },
    { n: "3", title: "Receive curated visibility or matching", body: "Qualified participants are surfaced to relevant counterparts." },
    { n: "4", title: "Move into qualified conversations", body: "Introductions are made when alignment is confirmed on both sides." },
  ];

  return (
    <section style={{ padding: "100px 40px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C7A96B", marginBottom: 24 }}>Process</p>
          <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 300, marginBottom: 80, lineHeight: 1.2 }}>How Klub Capital works</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 0 }}>
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ padding: "0 40px 0 0", borderLeft: i === 0 ? "none" : "none", position: "relative" }}>
                {i > 0 && <div style={{ position: "absolute", top: 12, left: -1, width: 40, height: "1px", background: "#E4E4E4" }} />}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ width: 28, height: 28, border: "1px solid #E4E4E4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#C7A96B", flexShrink: 0 }}>{s.n}</span>
                  <div style={{ flex: 1, height: "1px", background: i < steps.length - 1 ? "#E4E4E4" : "transparent" }} />
                </div>
                <p className="serif" style={{ fontSize: 19, fontWeight: 400, color: "#1C1C1C", marginBottom: 12, lineHeight: 1.3 }}>{s.title}</p>
                <p style={{ fontSize: 14, fontWeight: 300, color: "#6B6B6B", lineHeight: 1.7 }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Differentiation ───────────────────────────────────────────────────────────
const Differentiation = () => {
  const items = [
    { title: "Investor-first design", body: "Built around relevance, not volume." },
    { title: "Selective access", body: "The network stays curated to preserve quality." },
    { title: "Capital readiness layer", body: "Businesses are prepared before they are presented." },
    { title: "Discreet by design", body: "Private opportunities require trust, structure, and control." },
  ];

  return (
    <section style={{ background: "#EFEDE7", padding: "100px 40px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Reveal>
          <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 300, marginBottom: 72, lineHeight: 1.2 }}>Not another deal board.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2 }}>
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ background: "#F7F6F3", padding: "44px 40px", minHeight: 200 }}>
                <p className="serif" style={{ fontSize: 20, fontWeight: 400, color: "#1C1C1C", marginBottom: 14, lineHeight: 1.3 }}>{item.title}</p>
                <p style={{ fontSize: 14, fontWeight: 300, color: "#6B6B6B", lineHeight: 1.7 }}>{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Trust / Access ────────────────────────────────────────────────────────────
const TrustAccess = () => (
  <section style={{ padding: "100px 40px", background: "#F7F6F3" }}>
    <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
      <Reveal>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
          {["Invite-only", "Curated intake", "Selective review", "Private by design"].map((tag, i) => (
            <span key={i} style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B6B6B", border: "1px solid #E4E4E4", padding: "6px 14px" }}>{tag}</span>
          ))}
        </div>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C7A96B", marginBottom: 24 }}>Access</p>
        <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 300, marginBottom: 32, lineHeight: 1.2 }}>Access is curated.</h2>
        <p style={{ fontSize: 17, fontWeight: 300, color: "#6B6B6B", lineHeight: 1.8, marginBottom: 24 }}>
          Klub Capital is not an open marketplace. Participation is reviewed to maintain quality across investors, businesses, and opportunities.
        </p>
        <p style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ABABAB" }}>Designed for serious participants only.</p>
      </Reveal>
    </div>
  </section>
);

// ── Application ───────────────────────────────────────────────────────────────
const industries = ["Consumer", "SaaS", "Healthcare", "Manufacturing", "Financial Services", "Logistics", "Retail", "D2C", "Other"];

const FormField = ({ label, type = "text", children, style }) => (
  <div style={{ marginBottom: 28, ...style }}>
    <label style={{ display: "block", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ABABAB", marginBottom: 8 }}>{label}</label>
    {children || <input type={type} placeholder="" />}
  </div>
);

const InvestorForm = () => {
  const [industry, setIndustry] = useState("");
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0 40px" }}>
        <FormField label="Full Name" />
        <FormField label="Firm Name" />
        <FormField label="Email" type="email" />
        <FormField label="Investor Type">
          <select><option value="">Select</option>{["Angel", "Family Office", "VC", "PE", "HNI", "Institutional"].map(o => <option key={o}>{o}</option>)}</select>
        </FormField>
        <FormField label="Preferred Check Size">
          <select><option value="">Select</option>{["Under $100K", "$100K to $500K", "$500K to $1M", "$1M to $5M", "$5M+"].map(o => <option key={o}>{o}</option>)}</select>
        </FormField>
        <FormField label="Geography" />
        <FormField label="Segments / Industries to Invest In">
          <select onChange={e => setIndustry(e.target.value)}>
            <option value="">Select</option>{industries.map(o => <option key={o}>{o}</option>)}
          </select>
        </FormField>
        {industry === "Other" && <FormField label="Other Industry Name" />}
      </div>
      <FormField label="Short Note">
        <textarea rows={3} placeholder="Tell us briefly about your investment focus and what you are looking for." />
      </FormField>
      <button className="btn-primary" style={{ marginTop: 8 }}>Apply as Investor</button>
    </div>
  );
};

const BusinessForm = () => (
  <div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0 40px" }}>
      <FormField label="Founder Name" />
      <FormField label="Company Name" />
      <FormField label="Email" type="email" />
      <FormField label="Industry">
        <select><option value="">Select</option>{industries.map(o => <option key={o}>{o}</option>)}</select>
      </FormField>
      <FormField label="Revenue Stage">
        <select><option value="">Select</option>{["Pre-Revenue", "Early Revenue", "Growing", "Profitable"].map(o => <option key={o}>{o}</option>)}</select>
      </FormField>
      <FormField label="Funding Required">
        <select><option value="">Select</option>{["Under $500K", "$500K to $1M", "$1M to $5M", "$5M to $10M", "$10M+"].map(o => <option key={o}>{o}</option>)}</select>
      </FormField>
      <FormField label="Business Model" />
      <FormField label="Geography" />
      <FormField label="Website" type="url" />
    </div>
    <FormField label="Short Business Summary">
      <textarea rows={3} placeholder="Describe your business, traction, and what you are looking for." />
    </FormField>
    <button className="btn-primary" style={{ marginTop: 8 }}>Submit a Business</button>
  </div>
);

const ApplicationSection = () => {
  const [tab, setTab] = useState("investor");
  return (
    <section style={{ background: "#EFEDE7", padding: "100px 40px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C7A96B", marginBottom: 24 }}>Applications</p>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 300, marginBottom: 56, lineHeight: 1.2 }}>Begin your application.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ background: "#F7F6F3", border: "1px solid #E4E4E4", padding: "56px 56px 60px" }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: 40, marginBottom: 52, borderBottom: "1px solid #E4E4E4", paddingBottom: 0 }}>
              {[["investor", "Investor"], ["business", "Business"]].map(([key, label]) => (
                <button key={key} onClick={() => setTab(key)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 0 18px", fontFamily: "'DM Sans', sans-serif", fontWeight: 400, transition: "color 0.2s", color: tab === key ? "#1C1C1C" : "#ABABAB", borderBottom: tab === key ? "1px solid #1C1C1C" : "1px solid transparent", marginBottom: -1 }}>
                  {label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                {tab === "investor" ? <InvestorForm /> : <BusinessForm />}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ── Final CTA ─────────────────────────────────────────────────────────────────
const FinalCTA = () => (
  <section style={{ padding: "120px 40px", textAlign: "center", background: "#1C1C1C" }}>
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <Reveal>
        <h2 className="serif" style={{ fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 300, color: "#F7F6F3", marginBottom: 28, lineHeight: 1.1, fontStyle: "italic" }}>
          Enter the right room.
        </h2>
        <p style={{ fontSize: 17, fontWeight: 300, color: "rgba(247,246,243,0.55)", lineHeight: 1.8, marginBottom: 52 }}>
          Whether you are allocating capital or seeking it, Klub Capital is designed to make the first interaction more intelligent.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          <button style={{ display: "inline-block", padding: "13px 32px", border: "1px solid #C7A96B", background: "#C7A96B", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 400, letterSpacing: "0.08em", cursor: "pointer", textTransform: "uppercase", transition: "all 0.2s" }}>Apply as Investor</button>
          <button style={{ display: "inline-block", padding: "13px 32px", border: "1px solid rgba(247,246,243,0.3)", background: "transparent", color: "#F7F6F3", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 400, letterSpacing: "0.08em", cursor: "pointer", textTransform: "uppercase", transition: "all 0.2s" }}>Submit a Business</button>
        </div>
        <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(247,246,243,0.3)" }}>Private access. Selective review. Quality over volume.</p>
      </Reveal>
    </div>
  </section>
);

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: "#1C1C1C", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "56px 40px 40px" }}>
    <div style={{ maxWidth: 1080, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 56 }}>
        <div>
          <p className="serif" style={{ fontSize: 18, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#F7F6F3", marginBottom: 6 }}>Klub Capital</p>
          <p style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(247,246,243,0.35)" }}>Private capital network</p>
        </div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {["About", "Investors", "Businesses", "Privacy", "Contact"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(247,246,243,0.4)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#C7A96B"}
              onMouseLeave={e => e.target.style.color = "rgba(247,246,243,0.4)"}>{l}</a>
          ))}
        </div>
      </div>
      <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", marginBottom: 28 }} />
      <p style={{ fontSize: 11, color: "rgba(247,246,243,0.25)", letterSpacing: "0.06em" }}>
        &copy; {new Date().getFullYear()} Klub Capital. All rights reserved.
      </p>
    </div>
  </footer>
);

// ── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <QuietStatement />
        <Problem />
        <Solution />
        <Audience />
        <HowItWorks />
        <Differentiation />
        <TrustAccess />
        <ApplicationSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
