import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { PortableText } from "@portabletext/react";
import logoSrc from "@/imports/rm_logos-black.png";
import { useTheme, serif, sans } from "./theme";
import { NAV_LINKS, STATS_BAR, CASE_STUDIES } from "./data";

// ─── EYEBROW ─────────────────────────────────────────────────────────────────
export function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  const T = useTheme();
  const col = light ? "#b794ff" : T.purple;
  return (
    <div className="inline-flex items-center gap-2.5 mb-[18px]">
      <span className="w-7 h-px flex-shrink-0" style={{ background: col }} />
      <span className="text-[13px] font-semibold tracking-[.14em] uppercase" style={{ ...sans, color: col }}>
        {children}
      </span>
    </div>
  );
}

// ─── RICH TEXT ───────────────────────────────────────────────────────────────
// Accepts either a plain string (static fallback data) or a Portable Text block
// array (fetched from Sanity). Renders both correctly.
type RichValue = string | any[] | null | undefined;

export function RichText({
  value,
  style: styleProp,
  className,
}: {
  value: RichValue;
  style?: React.CSSProperties;
  className?: string;
}) {
  if (!value) return null;

  // Plain string — static fallback
  if (typeof value === "string") {
    return <p style={styleProp} className={className}>{value}</p>;
  }

  // Portable Text block array from Sanity
  // Style is placed on the wrapper div so CSS color inheritance works correctly
  // even when PortableText skips re-rendering its blocks (e.g. on hover state changes).
  return (
    <div className={className} style={styleProp}>
      <PortableText
        value={value}
        components={{
          block: {
            normal: ({ children }) => (
              <p style={{ margin: 0, marginBottom: "1em" }}>{children}</p>
            ),
            h1: ({ children }) => (
              <h1 style={{ ...serif, fontSize: "clamp(28px,3vw,42px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 0.6em" }}>{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 style={{ ...serif, fontSize: "clamp(22px,2.4vw,32px)", fontWeight: 600, lineHeight: 1.2, margin: "0 0 0.6em" }}>{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 style={{ ...serif, fontSize: "clamp(18px,2vw,24px)", fontWeight: 600, lineHeight: 1.25, margin: "0 0 0.5em" }}>{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 style={{ ...sans, fontSize: "clamp(14px,1.6vw,18px)", fontWeight: 700, lineHeight: 1.3, margin: "0 0 0.5em" }}>{children}</h4>
            ),
            blockquote: ({ children }) => (
              <blockquote style={{ borderLeft: "3px solid #6c3ce0", paddingLeft: 16, fontStyle: "italic", margin: "0 0 1em" }}>
                {children}
              </blockquote>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul style={{ margin: "0 0 1em", paddingLeft: 20, listStyleType: "disc" }}>{children}</ul>
            ),
            number: ({ children }) => (
              <ol style={{ margin: "0 0 1em", paddingLeft: 20, listStyleType: "decimal" }}>{children}</ol>
            ),
          },
          listItem: {
            bullet: ({ children }) => (
              <li style={{ marginBottom: "0.4em", lineHeight: 1.65 }}>{children}</li>
            ),
            number: ({ children }) => (
              <li style={{ marginBottom: "0.4em", lineHeight: 1.65 }}>{children}</li>
            ),
          },
          marks: {
            strong: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
            em:     ({ children }) => <em style={{ fontStyle: "italic" }}>{children}</em>,
            link:   ({ value: v, children }) => (
              <a href={v?.href} target="_blank" rel="noopener noreferrer"
                 style={{ color: "#6c3ce0", textDecoration: "underline" }}>
                {children}
              </a>
            ),
          },
        }}
      />
    </div>
  );
}

// ─── PAGE HERO ───────────────────────────────────────────────────────────────
export function PageHero({ eyebrow, heading, body }: { eyebrow: string; heading: React.ReactNode; body?: string }) {
  const T = useTheme();
  return (
    <section style={{ background: T.bg, paddingTop: "clamp(120px,12vw,160px)", paddingBottom: 72 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 style={{ ...serif, fontSize: "clamp(40px,5vw,72px)", color: T.ink, maxWidth: 760, lineHeight: 1.08, marginBottom: body ? 24 : 0, fontWeight: 600 }}>
          {heading}
        </h1>
        {body && (
          <p style={{ ...sans, fontSize: 18, color: T.gray, fontWeight: 300, maxWidth: 560, lineHeight: 1.65, marginTop: 20 }}>
            {body}
          </p>
        )}
      </div>
    </section>
  );
}

// ─── SECTION HEAD ────────────────────────────────────────────────────────────
export function SectionHead({ heading, body, light = false }: { heading: React.ReactNode; body?: string; light?: boolean }) {
  const T = useTheme();
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16">
      <h2 className="text-[clamp(30px,3.6vw,46px)] max-w-[600px] leading-[1.15]"
          style={{ ...serif, color: light ? "#fff" : T.ink }}>{heading}</h2>
      {body && <p className="max-w-[380px] font-light text-[15px]" style={{ ...sans, color: light ? "#a39db0" : T.gray }}>{body}</p>}
    </div>
  );
}

// ─── BUTTONS ─────────────────────────────────────────────────────────────────
export function BtnPrimary({ to, href, children, small = false }: { to?: string; href?: string; children: React.ReactNode; small?: boolean }) {
  const T = useTheme();
  const style: React.CSSProperties = {
    ...sans, display: "inline-flex", alignItems: "center", gap: 10,
    background: T.purple, color: "#fff",
    padding: small ? "13px 26px" : "16px 32px",
    fontSize: small ? "12px" : "14px",
    fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase",
    borderRadius: 999, textDecoration: "none", transition: "all .3s ease",
  };
  const onEnter = (e: React.MouseEvent<HTMLElement>) => { const el = e.currentTarget; el.style.background = T.purpleD; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 14px 30px -10px rgba(108,60,224,.55)"; };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => { const el = e.currentTarget; el.style.background = T.purple; el.style.transform = "none"; el.style.boxShadow = "none"; };
  if (to) return <Link to={to} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</Link>;
  return <a href={href ?? "#"} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</a>;
}

export function BtnOutline({ to, href, children, small = false, white = false }: { to?: string; href?: string; children: React.ReactNode; small?: boolean; white?: boolean }) {
  const T = useTheme();
  const col = white ? "#fff" : T.ink;
  const style: React.CSSProperties = {
    ...sans, display: "inline-flex", alignItems: "center", gap: 10,
    background: "transparent", color: col,
    border: `1px solid ${white ? "rgba(255,255,255,.6)" : T.ink}`,
    padding: small ? "13px 26px" : "16px 32px",
    fontSize: small ? "12px" : "14px",
    fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase",
    borderRadius: 999, textDecoration: "none", transition: "all .3s ease",
  };
  const onEnter = (e: React.MouseEvent<HTMLElement>) => { const el = e.currentTarget; if (white) { el.style.background = "rgba(255,255,255,.1)"; } else { el.style.background = T.ink; el.style.color = T.bg; } };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = col; };
  if (to) return <Link to={to} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</Link>;
  return <a href={href ?? "#"} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</a>;
}

// ─── STATS BAR (matching the provided screenshot) ────────────────────────────
export function StatsBar({ items }: { items?: { num: string; label: string }[] }) {
  const statsItems = items ?? STATS_BAR;
  return (
    <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #06040d 0%, #1c1040 55%, #06040d 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,.025) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(255,255,255,.025) 0 1px, transparent 1px 40px)",
      }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 32px", position: "relative" }}>
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: "48px 32px" }}>
          {statsItems.map(s => (
            <div key={s.label}>
              <div style={{ ...serif, fontSize: "clamp(38px,4.5vw,56px)", color: "#ffffff", fontWeight: 700, lineHeight: 1, marginBottom: 10 }}>
                {s.num}
              </div>
              <div style={{ ...sans, fontSize: 11, color: "#9b6dff", textTransform: "uppercase", letterSpacing: ".2em", fontWeight: 600 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────
export function ServiceCard({ service }: { service: (typeof import("./data").SERVICES)[number] }) {
  const T = useTheme();
  const [hov, setHov] = useState(false);
  if (!service) return null;
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
         style={{ border: `1px solid ${hov ? "transparent" : T.border}`, borderRadius: 20, padding: "40px 32px", background: hov ? T.hoverBg : T.card, transform: hov ? "translateY(-6px)" : "none", boxShadow: hov ? T.hoverShadow : "none", transition: "all .35s ease", cursor: "default" }}>
      <span style={{ ...sans, fontSize: 13, color: hov ? T.hoverNum : T.purple, fontWeight: 700, letterSpacing: ".08em", display: "block", marginBottom: 24, transition: "color .3s" }}>{service.num}</span>
      <h3 style={{ ...serif, fontSize: 20, color: hov ? T.hoverText : T.ink, marginBottom: 14, lineHeight: 1.25, transition: "color .3s" }}>{service.title}</h3>
      <RichText value={service.description} style={{ ...sans, fontSize: 14.5, color: hov ? T.hoverBody : T.gray, fontWeight: 300, lineHeight: 1.65, transition: "color .3s" }} />
    </div>
  );
}

// ─── WORK CARD ────────────────────────────────────────────────────────────────
export function WorkCard({ item, linkTo }: { item: (typeof CASE_STUDIES)[number]; linkTo?: string }) {
  const T = useTheme();
  const [hov, setHov] = useState(false);
  if (!item) return null;
  const inner = (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
         style={{ borderRadius: 22, overflow: "hidden", background: T.card, border: `1px solid ${T.border}`, transform: hov ? "translateY(-6px)" : "none", boxShadow: hov ? T.workShadow : "none", transition: "transform .35s ease, box-shadow .35s ease", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="relative flex items-start justify-between"
           style={{ aspectRatio: "16/10", background: (item as any).gradient ?? "#0d0c10", padding: 22, flexShrink: 0, overflow: "hidden" }}>
        {(item as any).coverImage && (
          <img src={(item as any).coverImage} alt={item.title}
               style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,.18) 0%, rgba(0,0,0,.45) 100%)" }} />
        <span className="relative z-10" style={{ ...sans, fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", color: "#fff", background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.25)", padding: "7px 14px", borderRadius: 999 }}>{item.tag}</span>
        <span className="relative z-10" style={{ width: 38, height: 38, borderRadius: "50%", background: "#fff", color: "#0d0c10", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transform: hov ? "rotate(45deg)" : "none", transition: "transform .3s ease" }}>↗</span>
      </div>
      <div style={{ padding: "26px 28px 30px", flex: 1 }}>
        <h3 style={{ ...serif, fontSize: 20, color: T.ink, marginBottom: 8 }}>{item.title ?? ""}</h3>
        <p style={{ ...sans, fontSize: 13.5, color: T.gray, fontWeight: 300, lineHeight: 1.65 }}>{item.shortDesc ?? ""}</p>
      </div>
    </div>
  );
  if (linkTo) return <Link to={linkTo} style={{ textDecoration: "none", display: "block" }}>{inner}</Link>;
  return inner;
}

// ─── SHARED NAV ───────────────────────────────────────────────────────────────
export function SharedNav() {
  const T = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const isActive = (path: string) => location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
            style={{ background: T.navBg, backdropFilter: "blur(14px)", borderBottom: `1px solid ${T.navBorder}`, boxShadow: scrolled ? T.scrollShadow : "none" }}>
      <nav className="flex items-center justify-between" style={{ maxWidth: 1200, margin: "0 auto", padding: "22px 32px" }}>
        <Link to="/">
          <img src={logoSrc} alt="Runway Media" style={{ height: 48, width: "auto", filter: T.logoInvert }} />
        </Link>

        <ul className="hidden md:flex items-center" style={{ gap: 40, listStyle: "none", padding: 0, margin: 0 }}>
          {NAV_LINKS.map(l => (
            <li key={l.label}>
              <Link to={l.path} style={{ ...sans, fontSize: 13, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: isActive(l.path) ? T.purple : T.ink, textDecoration: "none", position: "relative", paddingBottom: 4, display: "block" }}>
                {l.label}
                <span style={{ position: "absolute", left: 0, bottom: 0, height: 2, background: T.purple, width: isActive(l.path) ? "100%" : "0%", transition: "width .3s ease" }} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center" style={{ gap: 16 }}>
          <BtnPrimary to="/contact" small>Start a Project</BtnPrimary>
        </div>

        <button className="md:hidden p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X size={22} color={T.ink} /> : <Menu size={22} color={T.ink} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden flex flex-col" style={{ background: T.bg, borderTop: `1px solid ${T.border}`, padding: "28px 32px", gap: 22 }}>
          {NAV_LINKS.map(l => (
            <Link key={l.label} to={l.path} style={{ ...sans, fontSize: 13, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: isActive(l.path) ? T.purple : T.ink, textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
          <BtnPrimary to="/contact">Start a Project</BtnPrimary>
        </div>
      )}
    </header>
  );
}

// ─── SHARED FOOTER ────────────────────────────────────────────────────────────
export function SharedFooter() {
  const T = useTheme();
  const LINE = "#ece9f2";
  return (
    <footer style={{ paddingTop: 90, background: T.bgDark }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"
             style={{ gap: 50, paddingBottom: 70, borderBottom: "1px solid rgba(255,255,255,.07)" }}>
          <div>
            <img src={logoSrc} alt="Runway Media" style={{ height: 28, width: "auto", marginBottom: 18, filter: "brightness(0) invert(1)" }} />
            <p style={{ ...sans, color: "#6b6873", fontSize: 14, fontWeight: 300, maxWidth: 280, marginBottom: 24, lineHeight: 1.65 }}>
              A PR and communications agency for brands ready to lead their category.
            </p>
            <div className="flex" style={{ gap: 12 }}>
              {[{ s: "in", a: "LinkedIn" }, { s: "X", a: "Twitter" }, { s: "ig", a: "Instagram" }].map(item => (
                <FooterSocialIcon key={item.s} label={item.s} aria={item.a} />
              ))}
            </div>
          </div>
          <FooterCol heading="Agency"   links={[["Services","/services"],["Our Work","/work"],["About Us","/about"],["Clients","/clients"]]} />
          <FooterCol heading="Services" links={[["Media Relations","/services"],["Brand Strategy","/services"],["Crisis Comms","/services"],["Launch PR","/services"]]} />
          <FooterCol heading="Contact"  links={[["hello@runwaymedia.com","mailto:hello@runwaymedia.com"],["+1 (000) 000-0000","tel:+10000000000"],["New York, NY","#"]]} />
        </div>
        <div className="flex flex-wrap justify-between items-center" style={{ ...sans, padding: "30px 0 36px", gap: 16, fontSize: 13, color: "#5c576a" }}>
          <span>© 2026 Runway Media. All rights reserved.</span>
          <div className="flex" style={{ gap: 24 }}>
            {["Privacy Policy","Terms of Service"].map(l => (
              <a key={l} href="#" style={{ color: "#5c576a", textDecoration: "none", transition: "color .25s" }}
                 onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = T.purple)}
                 onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#5c576a")}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ heading, links }: { heading: string; links: [string, string][] }) {
  const T = useTheme();
  return (
    <div>
      <h5 style={{ ...sans, fontSize: 13, textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 700, marginBottom: 22, color: "#fff" }}>{heading}</h5>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {links.map(([label, href]) => (
          <li key={label} style={{ marginBottom: 13 }}>
            {href.startsWith("/") ? (
              <Link to={href} style={{ ...sans, color: "#6b6873", fontSize: 14, textDecoration: "none", transition: "color .25s" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = T.purple)}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#6b6873")}>{label}</Link>
            ) : (
              <a href={href} style={{ ...sans, color: "#6b6873", fontSize: 14, textDecoration: "none", transition: "color .25s" }}
                 onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = T.purple)}
                 onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#6b6873")}>{label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterSocialIcon({ label, aria }: { label: string; aria: string }) {
  const T = useTheme();
  return (
    <a href="#" aria-label={aria} className="flex items-center justify-center transition-all duration-300"
       style={{ ...sans, width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(255,255,255,.12)", fontSize: 13, color: "#9c99a3", textDecoration: "none" }}
       onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = T.purple; el.style.borderColor = T.purple; el.style.color = "#fff"; }}
       onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.borderColor = "rgba(255,255,255,.12)"; el.style.color = "#9c99a3"; }}>
      {label}
    </a>
  );
}

// ─── CTA SECTION (shared across pages) ───────────────────────────────────────
export function CtaSection({ email }: { email?: string }) {
  const T = useTheme();
  const ctaEmail = email ?? "hello@runwaymedia.com";
  return (
    <section style={{ padding: "120px 0", background: T.bg }}>
      <div className="relative overflow-hidden text-center"
           style={{ margin: "0 32px", borderRadius: 32, padding: "clamp(60px,8vw,90px) clamp(28px,6vw,60px)", background: `linear-gradient(120deg, ${T.purpleD}, ${T.purple} 60%, #8b5cf6)` }}>
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "repeating-linear-gradient(115deg, rgba(255,255,255,.05) 0 2px, transparent 2px 30px)" }} />
        <div className="relative z-10" style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ ...serif, fontSize: "clamp(30px,3.6vw,46px)", color: "#fff", marginBottom: 18, lineHeight: 1.15 }}>Ready to make news?</h2>
          <p style={{ ...sans, color: "#e9defe", fontWeight: 300, marginBottom: 40, fontSize: 16, lineHeight: 1.65 }}>
            Tell us about your brand, and we'll show you the story the press is waiting to write about you.
          </p>
          <div className="flex flex-wrap justify-center" style={{ gap: 18 }}>
            <a href={`mailto:${ctaEmail}`}
               className="inline-flex items-center rounded-full font-semibold tracking-[.04em] uppercase transition-all duration-300"
               style={{ ...sans, background: "#fff", color: "#0d0c10", padding: "16px 32px", fontSize: 14, textDecoration: "none" }}
               onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = T.isDark ? "#ede9f8" : T.purple; el.style.color = T.isDark ? "#0d0c10" : "#fff"; el.style.transform = "translateY(-2px)"; }}
               onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#fff"; el.style.color = "#0d0c10"; el.style.transform = "none"; }}>
              {ctaEmail}
            </a>
            <BtnOutline to="/contact" white>Book a Call</BtnOutline>
          </div>
        </div>
      </div>
    </section>
  );
}
