import React from "react";
import { Link } from "react-router";
import { useTheme, serif, sans } from "./theme";
import { useSiteSettings } from "../sanity/hooks";

// Footer utility links are intentionally kept in one place so this can later
// be expanded for other useful resources without changing the footer layout.
const FOOTER_UTILITY_LINKS: { label: string; href?: string; external?: boolean }[] = [
  { label: "Website by: UxFul", href: "https://www.uxful.in", external: true },
];

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
              <a href={href} style={{ ...sans, color: "#6b6873", fontSize: 14, textDecoration: "none", transition: "color .25s" }}>{label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ label, href, aria }: { label: string; href?: string; aria: string }) {
  const T = useTheme();
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={aria}
       className="flex items-center justify-center transition-all duration-300"
       style={{ ...sans, width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(255,255,255,.12)", fontSize: 13, color: "#9c99a3", textDecoration: "none" }}
       onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = T.purple; el.style.borderColor = T.purple; el.style.color = "#fff"; }}
       onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.borderColor = "rgba(255,255,255,.12)"; el.style.color = "#9c99a3"; }}>
      {label}
    </a>
  );
}

export function SanityFooter() {
  const T = useTheme();
  const settings = useSiteSettings();
  const tagline = settings.footerTagline || "A PR and communications agency for brands ready to lead their category.";
  const copyright = settings.footerCopyright || "© 2026 Runway Media. All rights reserved.";

  return (
    <footer style={{ paddingTop: 90, background: T.bgDark }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"
             style={{ gap: 50, paddingBottom: 70, borderBottom: "1px solid rgba(255,255,255,.07)" }}>
          <div>
            <div style={{ ...serif, fontSize: 24, color: "#fff", marginBottom: 18, fontWeight: 600 }}>Runway Media</div>
            <p style={{ ...sans, color: "#6b6873", fontSize: 14, fontWeight: 300, maxWidth: 280, marginBottom: 24, lineHeight: 1.65 }}>{tagline}</p>
            <div className="flex" style={{ gap: 12 }}>
              <SocialIcon label="in" href={settings.socialLinkedIn} aria="LinkedIn" />
              <SocialIcon label="ig" href={settings.socialInstagram} aria="Instagram" />
            </div>
          </div>
          <FooterCol heading="Agency" links={[["Services", "/services"], ["Our Work", "/work"], ["About Us", "/about"], ["Clients", "/clients"]]} />
          <FooterCol heading="Services" links={[["Media Relations", "/services"], ["Brand Strategy", "/services"], ["Crisis Comms", "/services"], ["Launch PR", "/services"]]} />
          <FooterCol heading="Contact" links={[
            [settings.email || "hello@runwaymedia.com", `mailto:${settings.email || "hello@runwaymedia.com"}`],
            [settings.phone || "+1 (000) 000-0000", `tel:${(settings.phone || "+1 (000) 000-0000").replace(/[^+\d]/g, "")}`],
            [settings.address || "New York, NY", "#"],
          ]} />
        </div>
        <div className="flex flex-wrap justify-between items-center" style={{ ...sans, padding: "30px 0 36px", gap: 16, fontSize: 13, color: "#5c576a" }}>
          <span>{copyright}</span>
          <div className="flex" style={{ gap: 24 }}>
            {FOOTER_UTILITY_LINKS.map(({ label, href, external }) => (
              href ? (
                <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
                   style={{ color: "#5c576a", textDecoration: "none", transition: "color .25s" }}
                   onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = T.purple)}
                   onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#5c576a")}>{label}</a>
              ) : (
                <span key={label} style={{ color: "#5c576a" }}>{label}</span>
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
