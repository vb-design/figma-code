import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import heroImg from "@/imports/DigitalAgencyWebsiteDesign-1/60b7a862eb47e15ba993b51cf656d2c491448205.png";
import svgPaths from "@/imports/App-1/svg-r0oxntpn6i";
import { useTheme, serif, sans } from "../theme";
import {
  useSiteSettings, useCaseStudies, useTestimonials, useServices,
} from "../../sanity/hooks";
import { Eyebrow, BtnPrimary, BtnOutline, StatsBar, CtaSection, RichText } from "../components";

export function Home() {
  const T = useTheme();
  const settings     = useSiteSettings();
  const caseStudies  = useCaseStudies();
  const testimonials = useTestimonials();
  const services     = useServices();

  return (
    <div style={{ ...sans, color: T.ink }}>

      {/* ── CASE STUDIES — sticky scroll ── */}
      <CaseStudiesScroll caseStudies={caseStudies.slice(0, 5)} />

      {/* ── LOGO CAROUSEL ── */}
      <LogoCarousel outlets={settings.mediaOutlets} T={T} />

      {/* ── SERVICES — big heading + right visual + accordion ── */}
      <ServicesSection services={services} settings={settings} T={T} />

      {/* ── STATS BAR ── */}
      <StatsBar items={settings.statsBar} />

      {/* ── ABOUT — editorial two-column ── */}
      <AboutSection settings={settings} T={T} />

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "120px 0", background: T.bgDark }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ marginBottom: 64 }}>
            <Eyebrow light>Client Voices</Eyebrow>
            <h2 style={{ ...serif, fontSize: "clamp(30px,3.6vw,46px)", color: "#fff", maxWidth: 600, lineHeight: 1.15 }}>
              Trusted by founders, CMOs, and communications leads.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 24, marginBottom: 48 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: T.darkCardBg, border: `1px solid ${T.darkCardBorder}`, borderRadius: 20, padding: "34px 30px" }}>
                <div style={{ color: "#b794ff", fontSize: 14, letterSpacing: 3, marginBottom: 20 }}>★★★★★</div>
                <p style={{ ...sans, fontSize: 15, fontWeight: 300, color: "#e7e3ee", marginBottom: 28, minHeight: 96, lineHeight: 1.7 }}>"{t.quote}"</p>
                <div className="flex items-center" style={{ gap: 14 }}>
                  <div className="flex items-center justify-center flex-shrink-0"
                       style={{ ...serif, width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${T.purple}, #9c6bff)`, color: "#fff", fontWeight: 700, fontSize: 15 }}>
                    {t.initial}
                  </div>
                  <div>
                    <div style={{ ...sans, fontSize: 14, fontWeight: 600, color: "#fff" }}>{t.name}</div>
                    <div style={{ ...sans, fontSize: 12, color: "#a39db0" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link to="/clients" style={{ ...sans, fontSize: 13, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#b794ff", textDecoration: "none" }}>
              See All Client Stories →
            </Link>
          </div>
        </div>
      </section>

      <CtaSection email={settings.email} />
    </div>
  );
}

// ── Logo Carousel — infinite marquee ─────────────────────────────────────────

const LOGO_STYLES: Record<string, React.CSSProperties> = {
  "FORBES":       { fontFamily: "'Playfair Display', serif", fontWeight: 700, letterSpacing: "-0.02em" },
  "TechCrunch":   { fontFamily: "'Montserrat', sans-serif",  fontWeight: 800, letterSpacing: "-0.01em" },
  "Bloomberg":    { fontFamily: "'Playfair Display', serif", fontWeight: 600, letterSpacing: "0.01em" },
  "Fast Company": { fontFamily: "'Montserrat', sans-serif",  fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" as const },
  "WIRED":        { fontFamily: "'Montserrat', sans-serif",  fontWeight: 900, letterSpacing: "0.1em",  textTransform: "uppercase" as const },
  "Vogue":        { fontFamily: "'Playfair Display', serif", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase" as const, fontStyle: "italic" },
  "TIME":         { fontFamily: "'Montserrat', sans-serif",  fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase" as const },
  "Fortune":      { fontFamily: "'Playfair Display', serif", fontWeight: 700, letterSpacing: "0.02em" },
};

function LogoCarousel({ outlets, T }: { outlets: { name: string; logoUrl?: string }[]; T: any }) {
  const items = [...outlets, ...outlets, ...outlets];

  return (
    <div style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, background: T.bg, overflow: "hidden", position: "relative" }}>
      <div className="absolute inset-y-0 left-0 pointer-events-none" style={{ width: 120, zIndex: 2, background: `linear-gradient(to right, ${T.bg}, transparent)` }} />
      <div className="absolute inset-y-0 right-0 pointer-events-none" style={{ width: 120, zIndex: 2, background: `linear-gradient(to left, ${T.bg}, transparent)` }} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "44px 0",
          width: "max-content",
          animation: "logoScroll 28s linear infinite",
        }}
      >
        {items.map((outlet, i) => {
          const custom = LOGO_STYLES[outlet.name] ?? {};
          return (
            <React.Fragment key={i}>
              {outlet.logoUrl ? (
                <img
                  src={outlet.logoUrl}
                  alt={outlet.name}
                  style={{
                    height: 28,
                    width: "auto",
                    maxWidth: 120,
                    objectFit: "contain",
                    opacity: 0.55,
                    filter: T.isDark ? "brightness(0) invert(1)" : "none",
                    transition: "opacity .2s",
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "0.55")}
                />
              ) : (
                <span
                  style={{
                    fontSize: 22,
                    color: T.grayL,
                    opacity: 0.65,
                    whiteSpace: "nowrap",
                    userSelect: "none",
                    transition: "opacity .2s",
                    ...custom,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0.65")}
                >
                  {outlet.name}
                </span>
              )}
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.border, flexShrink: 0, display: "inline-block" }} />
            </React.Fragment>
          );
        })}
      </div>

      <style>{`
        @keyframes logoScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="logoScroll"] { animation: none; }
        }
      `}</style>
    </div>
  );
}

// ── Services Section ──────────────────────────────────────────────────────────

const SERVICE_ITEMS = [
  { label: "Brand Launches & Events", body: "We create strategic launch moments that generate media buzz, attract key audiences, and leave a lasting brand impression." },
  { label: "Influencer Marketing", body: "We build authentic creator relationships that place your brand where conversations are already happening." },
  { label: "Founder Positioning", body: "We turn your founder into a credible, media-ready voice — the kind press and audiences actively seek out." },
  { label: "Media Relations", body: "Earned coverage in the outlets that matter, built on lasting relationships with editors and journalists who trust our pitch." },
];

function ServiceCard({ item, T }: { item: { label: string; body: any }; T: any }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "linear-gradient(135deg, #1a1528, #3b1fa3)" : T.card,
        border: `1px solid ${hov ? "transparent" : T.border}`,
        borderRadius: 20,
        padding: "41px 33px",
        display: "flex",
        flexDirection: "column",
        cursor: "default",
        transition: "background .3s ease, border-color .3s ease, box-shadow .3s ease",
        boxShadow: hov ? "0 20px 40px rgba(108,60,224,0.25)" : "none",
      }}
    >
      <svg width="39" height="39" viewBox="0 0 39 39" fill="none" style={{ flexShrink: 0 }}>
        <rect width="39" height="39" rx="10" fill={hov ? "rgba(255,255,255,0.12)" : T.purpleP} />
        <path d={svgPaths.p238abb00} fill={hov ? "#c4a8ff" : T.purple} />
      </svg>
      <h3 style={{ ...serif, fontSize: 22, color: hov ? "#fff" : T.ink, fontWeight: 500, lineHeight: 1.25, marginTop: 24, marginBottom: 14, transition: "color .3s ease" }}>
        {item.label}
      </h3>
      <RichText value={item.body} style={{ ...sans, fontSize: 14.5, color: hov ? "rgba(255,255,255,0.65)" : T.gray, fontWeight: 300, lineHeight: 1.65, transition: "color .3s ease" }} />
    </div>
  );
}

function ServicesSection({ services, settings, T }: { services: any[]; settings: any; T: any }) {
  const items = services.length > 0
    ? services.map(s => ({ label: s.title, body: s.description }))
    : SERVICE_ITEMS;

  const rawHeadline = settings.servicesHeadline ?? "Strategic\ncommunications,\nbuilt around\nyour story.";
  const subtext     = settings.servicesSubtext  ?? "From media relations to crisis response, we offer a full suite of services to elevate how the world sees you.";
  const headlineLines = rawHeadline.split("\n");
  const firstLine     = headlineLines[0] ?? "";
  const restLines     = headlineLines.slice(1);

  return (
    <section style={{ padding: "120px 0", background: T.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between" style={{ gap: 40, marginBottom: 60 }}>
          <h2 style={{ ...serif, fontSize: "72px", lineHeight: 0.95, letterSpacing: "-2px", margin: 0, flexShrink: 0 }}>
            <span style={{ color: T.purple }}>{firstLine}</span>
            {restLines.map((line, i) => (
              <React.Fragment key={i}><br /><span style={{ color: T.ink }}>{line}</span></React.Fragment>
            ))}
          </h2>
          <p style={{ ...sans, fontSize: 15, fontWeight: 300, color: T.gray, lineHeight: 1.65, maxWidth: 380, margin: 0 }}>
            {subtext}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 28, marginBottom: 56 }}>
          {items.map((item, i) => <ServiceCard key={i} item={item} T={T} />)}
        </div>
        <div className="flex justify-center">
          <BtnOutline to="/services">All Services →</BtnOutline>
        </div>
      </div>
    </section>
  );
}

// ── Case Studies Sticky Scroll ────────────────────────────────────────────────

function CaseStudiesScroll({ caseStudies }: { caseStudies: any[] }) {
  const studies = caseStudies.length > 0 ? caseStudies : FALLBACK_STUDIES;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      const sectionHeight = el.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));
      const idx = Math.max(0, Math.min(
        studies.length - 1,
        Math.floor(progress * studies.length)
      ));
      setActiveIdx(idx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [studies.length]);

  const panelHeight = `${studies.length * 100}vh`;
  const safeIdx = Math.max(0, Math.min(activeIdx, studies.length - 1));
  const study = studies[safeIdx];
  const dotProgress = safeIdx / Math.max(studies.length - 1, 1);

  if (!study) return null;

  return (
    <div ref={containerRef} style={{ position: "relative", height: panelHeight, background: "#0f0f0f" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ height: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 72px 0" }}>
            <div style={{ maxWidth: 620, padding: "0 48px 0 clamp(24px,4vw,64px)" }}>
              <div style={{ display: "inline-block", background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.22)", borderRadius: 999, padding: "7px 16px", marginBottom: 40 }}>
                <span style={{ ...sans, fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#fff" }}>
                  Case Studies
                </span>
              </div>
              <div style={{ minHeight: 120 }}>
                <h2 key={activeIdx} style={{ ...serif, fontSize: "clamp(40px,5vw,72px)", color: "#fff", lineHeight: 1.05, margin: 0, animation: "cssFadeUp .5s cubic-bezier(.22,1,.36,1) both" }}>
                  {study.title}
                </h2>
              </div>
              <p key={`d${activeIdx}`} style={{ ...sans, fontSize: 18, fontWeight: 300, color: "#b794ff", lineHeight: 1.6, marginTop: 24, marginBottom: 40, maxWidth: 520, animation: "cssFadeUp .55s .07s cubic-bezier(.22,1,.36,1) both" }}>
                {study.shortDesc || "Award-winning campaign that moved the needle."}
              </p>
              <Link to={`/work/${study.slug}`} style={{ ...sans, display: "inline-block", fontSize: 14, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", padding: "15px 30px", borderRadius: 999, background: "#fff", color: "#0d0c10", textDecoration: "none" }}>
                View Case Study →
              </Link>
              <div style={{ display: "flex", gap: 8, marginTop: 48 }}>
                {studies.map((_, i) => (
                  <div key={i} style={{ height: 6, width: i === activeIdx ? 28 : 8, borderRadius: 999, background: i === activeIdx ? T_PURPLE : "rgba(255,255,255,.25)", transition: "width .4s cubic-bezier(.22,1,.36,1), background .3s ease" }} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ position: "relative", overflow: "hidden" }}>
            {studies.map((s, i) => {
              const isActive = i === activeIdx;
              return (
                <div key={i} style={{ position: "absolute", inset: 0, opacity: isActive ? 1 : 0, transform: isActive ? "scale(1)" : "scale(1.04)", transition: "opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)", zIndex: isActive ? 2 : 1 }}>
                  {s.coverImage ? <img src={s.coverImage} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} /> : <div style={{ width: "100%", height: "100%", background: s.gradient || "linear-gradient(135deg, #0d0c10 0%, #4b21b3 100%)" }} />}
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.35)" }} />
                  {s.tag && <div style={{ position: "absolute", top: 28, right: 28, background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.25)", borderRadius: 999, padding: "8px 16px" }}><span style={{ ...sans, fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#fff" }}>{s.tag}</span></div>}
                  {s.metrics?.[0] && <div style={{ position: "absolute", bottom: 40, left: 40 }}><div style={{ ...serif, fontSize: 52, color: "#fff", fontWeight: 700, lineHeight: 1 }}>{s.metrics[0].num}</div><div style={{ ...sans, fontSize: 13, color: "rgba(255,255,255,.65)", letterSpacing: ".06em", textTransform: "uppercase", marginTop: 4 }}>{s.metrics[0].label}</div></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`\n        @keyframes cssFadeUp {\n          from { opacity: 0; transform: translateY(18px); }\n          to   { opacity: 1; transform: translateY(0); }\n        }\n      `}</style>
    </div>
  );
}

// ── About Section — editorial two-column layout ───────────────────────────────

function AboutSection({ settings, T }: { settings: any; T: any }) {
  const headline  = settings.homeAboutHeadline  ?? "Don't become another dead post on social media.";
  const highlight = settings.homeAboutHighlight ?? "dead post";
  const subtext   = settings.homeAboutSubtext   ?? "People remember brands that give them something worth talking about.";
  const points: string[] = settings.homeAboutPoints ?? [
    "A founder with a point of view",
    "A product with a story",
    "A brand that consistently shows up where people are already paying attention",
  ];
  const cta   = settings.homeAboutCta ?? "That's where you need Runway Media.";
  const stats = settings.statsBar ?? [];
  const parts = highlight && headline.includes(highlight) ? headline.split(highlight) : null;
  const cardBg = T.isDark ? "rgba(108,60,224,0.14)" : "#e8e2f8";

  return (
    <section style={{ padding: "120px 0", background: T.bgAlt }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "80px 96px", alignItems: "center" }}>
          <div>
            <Eyebrow>About Runway Media</Eyebrow>
            <h2 style={{ ...serif, fontSize: "clamp(36px,4.2vw,58px)", lineHeight: 1.08, margin: "24px 0 26px" }}>
              {parts ? <>{parts[0]}<em style={{ color: T.purple, fontStyle: "italic" }}>{highlight}</em>{parts[1]}</> : headline}
            </h2>
            <p style={{ ...sans, fontSize: 17, color: T.gray, fontWeight: 300, lineHeight: 1.7, marginBottom: 32 }}>{subtext}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
              {points.map((p, i) => (
                <div key={i} className="flex items-start" style={{ gap: 14 }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: T.purpleP, color: T.purple, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ ...sans, fontSize: 15, color: T.ink, lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
            <BtnOutline to="/about">{cta} →</BtnOutline>
          </div>
          <div style={{ background: cardBg, borderRadius: 28, padding: "44px 42px" }}>
            <div style={{ ...serif, fontSize: "clamp(30px,3.4vw,46px)", color: T.ink, lineHeight: 1.1, marginBottom: 42 }}>People remember brands that give them something worth talking about.</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px 24px" }}>
              {stats.slice(0, 4).map((s: any) => (
                <div key={s.label}>
                  <div style={{ ...serif, fontSize: 34, color: T.purple, fontWeight: 700 }}>{s.num}</div>
                  <div style={{ ...sans, fontSize: 11, color: T.gray, textTransform: "uppercase", letterSpacing: ".06em", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FALLBACK_STUDIES = [
  { id: 1, slug: "wishcare-tinted-sunscreen", tag: "Beauty & Skin Care", title: "The PR Strategy Behind WishCare’s Tinted Sunscreen Launch", shortDesc: "WishCare didn’t just want to launch another sunscreen. The goal was to build a PR engine that could support the brand beyond a single product launch.", coverImage: "", gradient: "linear-gradient(135deg, #17121e 0%, #5b2bb8 100%)", metrics: [{ num: "2.4B", label: "Media Impressions" }] },
  { id: 2, slug: "sugar-cosmetics", tag: "Beauty", title: "Making SUGAR Cosmetics Impossible to Ignore", shortDesc: "A culturally sharp PR strategy that turned brand moments into sustained conversations.", coverImage: "", gradient: "linear-gradient(135deg, #160f1f 0%, #8b3dce 100%)", metrics: [{ num: "180+", label: "Media Features" }] },
  { id: 3, slug: "founder-positioning", tag: "Founder Positioning", title: "Putting Founders at the Centre of the Story", shortDesc: "Building founder visibility through credible points of view, timely commentary and earned media.", coverImage: "", gradient: "linear-gradient(135deg, #111017 0%, #3e3a6b 100%)", metrics: [{ num: "60+", label: "Founder Features" }] },
  { id: 4, slug: "brand-experience", tag: "Brand Experience", title: "Turning a Brand Event into a Media Moment", shortDesc: "From guest list to post-event coverage, every touchpoint was designed to create conversation.", coverImage: "", gradient: "linear-gradient(135deg, #12100f 0%, #a45b2a 100%)", metrics: [{ num: "3.2×", label: "Earned Reach" }] },
  { id: 5, slug: "healthcare-storytelling", tag: "Healthcare", title: "Making Complex Health Stories Human", shortDesc: "A media-first storytelling approach that translated expertise into stories people could understand and remember.", coverImage: "", gradient: "linear-gradient(135deg, #0f1516 0%, #2b7b77 100%)", metrics: [{ num: "85+", label: "Quality Placements" }] },
];
